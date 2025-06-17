import React, { useState, useEffect} from 'react';

const OnboardingModal = ( {collaborator, onClose, onSave} ) => {

    const[formData, setFormData] = useState({
        "name":"",
        "mail":"",
        "admissionDate": null,
        "welcomeOnboardingState":false,
        "technicalOnboardingState":false,
        "assignedTechinicalOnboardingDate": null
    });

     const formatDateForInput = (dateString) => {
        if (!dateString) {
        return null;
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null;
        }
        return date.toISOString().split('T')[0];
    };
    
    const resetForm = () => {
        setFormData({
            "name":"",
            "mail":"",
            "admissionDate": null,
            "welcomeOnboardingState":false,
            "technicalOnboardingState":false,
            "assignedTechinicalOnboardingDate": null
        })
    };
    
    useEffect( () => {
        if(collaborator){
            const formattedData = {
                ...collaborator,
                admissionDate: formatDateForInput(collaborator.admissionDate),
                assignedTechinicalOnboardingDate: formatDateForInput(collaborator.assignedTechinicalOnboardingDate)
            };
            setFormData({...formattedData});
        }else{
            resetForm();
        }
    }, [collaborator]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación básica
        if (!formData.name.trim() || !formData.mail.trim() || 
            !formData.admissionDate) {
        alert('Por favor, completa todos los campos requeridos');
        return;
        }
        onSave({ ...formData });
    }

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return(
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal'>
                <div className='modal-content'>
                    <span className='close' onClick={onClose}> &times;</span>
                    <h2>{collaborator ? 'Editar Colaborador' : 'Agregar Colaborador'}</h2>
                    <div>
                        <div className='form-group'>
                            <label>Nombre: </label>
                            <input
                                name = "name"
                                type =  "text"
                                value = {formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label>Correo electrónico: </label>
                            <input
                                name = "mail"
                                type =  "text"
                                value = {formData.mail}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label>Fecha de ingreso: </label>
                            <input
                                name = "admissionDate"
                                type =  "date"
                                value = {formData.admissionDate || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label className='checkbox-label'> 
                            <input 
                                name = "welcomeOnboardingState"
                                type =  "checkbox"
                                checked = {formData.welcomeOnboardingState}
                                onChange={handleInputChange}
                            />
                            Estado del Onboarding de Bienvenida
                            </label>
                        </div>

                        <div className='form-group'>
                            <label className='checkbox-label'> 
                            <input 
                                name = "technicalOnboardingState"
                                type =  "checkbox"
                                checked = {formData.technicalOnboardingState}
                                onChange={handleInputChange}
                            />
                            Estado del Onboarding Técnico
                            </label>
                        </div>

                        <div className='form-group'>
                            <label>Fecha de onboarding técnico asignado : </label>
                            <input
                                name = "assignedTechinicalOnboardingDate"
                                type =  "date"
                                value = {formData.assignedTechinicalOnboardingDate || ''}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-actions">
                            <button onClick={handleSubmit} className="save-btn">
                                Guardar
                            </button>
                            <button onClick={onClose} className="cancel-btn">
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                }

                .modal {
                background: white;
                padding: 20px;
                border-radius: 8px;
                width: 500px;
                max-width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                }

                .modal-content {
                position: relative;
                }

                .close {
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                transition: color 0.3s ease;
                }

                .close:hover {
                color: #333;
                }

                h2 {
                margin-top: 0;
                margin-bottom: 20px;
                color: #333;
                }

                .form-group {
                margin-bottom: 15px;
                }

                .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                color: #555;
                }

                .checkbox-label {
                display: flex !important;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                }

                input[type="text"],
                input[type="date"],
                textarea {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
                box-sizing: border-box;
                transition: border-color 0.3s ease;
                }

                input[type="text"]:focus,
                input[type="date"]:focus,
                textarea:focus {
                outline: none;
                border-color: #4CAF50;
                box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
                }

                input[type="checkbox"] {
                width: auto;
                margin: 0;
                }

                textarea {
                height: 100px;
                resize: vertical;
                font-family: inherit;
                }

                .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
                }

                .save-btn, .cancel-btn {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s ease;
                }

                .save-btn {
                background-color: #4CAF50;
                color: white;
                }

                .save-btn:hover {
                background-color: #45a049;
                }

                .cancel-btn {
                background-color: #f44336;
                color: white;
                }

                .cancel-btn:hover {
                background-color: #d32f2f;
                }

                @media (max-width: 600px) {
                .modal {
                    width: 95%;
                    padding: 15px;
                }

                .form-actions {
                    flex-direction: column;
                }

                .save-btn, .cancel-btn {
                    width: 100%;
                }
                }
            `}</style>

        </div>
    );

}
export default OnboardingModal;