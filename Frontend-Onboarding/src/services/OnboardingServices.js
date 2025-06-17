const BASE_URL = 'http://localhost:9000/api/collaborators'
const MAIL_URL = 'http://localhost:9000/mail'

const OnboardingServices = {
    async getCollaborators(searchParam ={}) {
        const url = this.buildSearchUrl(searchParam);
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Error fetching collaborators');
        } 

        return response.json();
    },
    buildSearchUrl(searchParams){
        const url = new URL(`${BASE_URL}/search`);
        if (searchParams.searchTerm && searchParams.searchTerm.trim()) {
            url.searchParams.append('searchTerm', searchParams.searchTerm.trim());
        }
        if (searchParams.welcomeOnboardingState === 'completed') {
            url.searchParams.append('welcomeOnboardingState', true);
        } else if (searchParams.welcomeOnboardingState === 'pending') {
            url.searchParams.append('welcomeOnboardingState', false);
        }
        
        if (searchParams.technicalOnboardingStateOnboardingState === 'completed') {
            url.searchParams.append('technicalOnboardingState', true);
        } else if (searchParams.technicalOnboardingStateOnboardingState === 'pending') {
            url.searchParams.append('technicalOnboardingState', false);
        }
        
        return url;
    },
    async addCollaborator(collaboratorData) {
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collaboratorData)
        });
        if (!response.ok){
            throw new Error('Error adding collaborator');
        }

        const savedCollaborator = await response.json();
        
        await this.sendWelcomeEmail(savedCollaborator);
        
        return savedCollaborator;
        
    },
    async updateCollaborator(collaboratorData) {
        console.log('esta:',collaboratorData)
        const response = await fetch(`${BASE_URL}/${collaboratorData.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collaboratorData)
        });
        console.log('si:',response)
        if (!response.ok) throw new Error('Error updating collaborator');

        return response.json();
    },
    async deleteCollaborator(id) {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error deleting collaborator');
    },

    async sendWelcomeEmail(collaborator){
        try{
            const emailContent = this.buildWelcomeEmailContent(collaborator);
            const mailData = {
                emailUser: collaborator.mail,
                message: emailContent
            };
            console.log(mailData)
            const response = await fetch(`${MAIL_URL}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mailData)
            });
            if(!response.ok){
                console.error('Error sending welcome maiil');
            }
        }catch(error){
            console.error('Error sending welcome mail',error);
        }
    },

    buildWelcomeEmailContent(collaborator){
        const formatDate = (dateString) => {
            if(!dateString) return 'No definida';
            return new Date(dateString).toLocaleDateString('es-ES', {
                year:'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        let emailContent = `
            ¡Bienvenido/a ${collaborator.name}!

            Nos complace informarte que has sido agregado/a a nuestro sistema de onboarding.

            Detalles de tu proceso de integración:
            • Fecha de ingreso: ${formatDate(collaborator.admissionDate)}
            • Estado de onboarding de bienvenida: ${collaborator.welcomeOnboardingCompleted ? 'Completado' : 'Pendiente'}`;

                    if (collaborator.assignedTechinicalOnboardingDate) {
                        emailContent += `
                            • Fecha de onboarding técnico: ${formatDate(collaborator.assignedTechinicalOnboardingDate)}
                            • Estado de onboarding técnico: ${collaborator.technicalOnboardingCompleted ? 'Completado' : 'Pendiente'}`;
        }
        return emailContent;
    },

    async checkOnboardingAlerts() {
        try{
            const collaborators = await this.getCollaborators();
            const alerts = [];
            const today = new Date();
            const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

            collaborators.forEach(collaborator => {
                if(collaborator.admissionDate && !collaborator.welcomeOnboardingCompleted){
                    const startDate = new Date(collaborator.admissionDate);
                    if(startDate <= oneWeekFromNow && startDate >= today){
                        alerts.push({
                            type: 'welcome',
                            collaborator: collaborator,
                            date: startDate,
                            daysRemaining: Math.ceil((startDate-today) / (1000 * 60 * 60 * 24))
                        });
                    }
                }
                if(collaborator.assignedTechinicalOnboardingDate && !collaborator.technicalOnboardingCompleted){
                    const techDate = new Date(collaborator.assignedTechinicalOnboardingDate);
                    if(techDate <= oneWeekFromNow && techDate >= today){
                        alerts.push({
                            type: 'technical',
                            collaborator: collaborator,
                            date: techDate,
                            daysRemaining: Math.ceil((techDate-today) / (1000 * 60 * 60 * 24))
                        });
                    }
                }
            });
            return alerts;
        }catch(error){
            console.error('Error checking onboarding alerts:', error);
            return [];
        }
    },
    
    async sendAlertEmails(alerts){
        for(const alert of alerts){
            try{
                const emailContent = this.buildAlertEmailContent(alert);
                const mailData = {
                    emailUser: 'camilo281913@gmail.com',
                    message: emailContent
                };
                await fetch (`${MAIL_URL}/send`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mailData)
                });
            }catch(error){
                 console.error('Error ssssssending alert mail', error);
            }
        }
    },
    buildAlertEmailContent(alert){
        const alertType = alert.type ==='welcome' ? 'Onboarding de Bienvenida' : 'Onboarding tecnico';
        const dateStr = alert.date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return `
            ALERTA DE ONBOARDING

            Colaborador: ${alert.collaborator.name}
            Email: ${alert.collaborator.mail}
            Tipo de Onboarding: ${alertType}
            Fecha programada: ${dateStr}
            Días restantes: ${alert.daysRemaining}

            ${alert.daysRemaining === 0 ? 
                '¡La fecha es HOY!' : 
                `Faltan ${alert.daysRemaining} día${alert.daysRemaining > 1 ? 's' : ''} para la fecha programada.`
            }

            Por favor, asegúrate de que todo esté preparado para el proceso de onboarding.

            Sistema de Gestión de Onboarding`;
    }

};


export default OnboardingServices