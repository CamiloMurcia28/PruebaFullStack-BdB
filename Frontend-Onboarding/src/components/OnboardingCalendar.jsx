import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function OnboardingCalendar({ collaborators }) {
  // Convertir colaboradores en eventos del calendario
  const events = collaborators?.map(collaborator => {
    const events = [];
    
    // Evento para Welcome Onboarding
    if (collaborator.admissionDate) {
      events.push({
        id: `welcome-${collaborator.id}`,
        title: `${collaborator.name} - Welcome`,
        start: collaborator.admissionDate,
        backgroundColor: collaborator.welcomeOnboardingState === 'completed' ? '#10b981' : '#3b82f6',
        extendedProps: {
          collaborator: collaborator,
          type: 'welcome'
        }
      });
    }
    
    // Evento para Technical Onboarding
    if (collaborator.assignedTechinicalOnboardingDate) {
      events.push({
        id: `technical-${collaborator.id}`,
        title: `${collaborator.name} - Technical`,
        start: collaborator.assignedTechinicalOnboardingDate,
        backgroundColor: collaborator.technicalOnboardingState === 'completed' ? '#10b981' : '#f59e0b',
        extendedProps: {
          collaborator: collaborator,
          type: 'technical'
        }
      });
    }
    
    return events;
  }).flat() || [];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="es"
      events={events}
      
    />

    
    
  )
}

export default OnboardingCalendar;