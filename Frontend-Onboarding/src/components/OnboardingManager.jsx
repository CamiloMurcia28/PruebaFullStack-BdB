import React, { useState, useEffect, use } from 'react';
import OnboardingTable from './OnboardingTable';
import OnboardingSearch from './OnboardingSearch';
import OnboardingServices from '../services/OnboardingServices';
import OnboardingModal from './OnboardingModal';
import OnboardingCalendar from './OnboardingCalendar';

const OnboardingManager = () => {
    const[collaborators, setCollaborators] = useState([]);
    const[filteredCollaborators, setFilteredCollaborators] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const[welcomeOnboardingState, setWelcomeOnboardingState] = useState('');
    const[technicalOnboardingState, settechnicalOnboardingState] = useState('');
    const[showModal, setShowModal] = useState(false);
    const[selectedCollaborator, setSelectedCollaborator] = useState('');
    const[activeTab, setActiveTab] = useState('list');
    const[alerts, setAlert] = useState([]);
    const[showAlerts, setShowAlerts] = useState(false);
 
    useEffect( () => {
        const loadCollaborators = async () => {
            try{
                const collaboratorsData = await OnboardingServices.getCollaborators();
                setCollaborators(collaboratorsData);
                setFilteredCollaborators([...collaboratorsData]);
            }catch (error) {
                console.error('Error loading collaborators: ', error);
            }
        };

        loadCollaborators();
        checkAlerts();

        const alertInterval = setInterval(checkAlerts, 3600000);
        
        return () => clearInterval(alertInterval);

    }, []);

    const checkAlerts = async () => {
        try{
            const currentAlerts = await OnboardingServices.checkOnboardingAlerts();
            if(currentAlerts.length > 0){
                setAlert(currentAlerts);
                setShowAlerts(true);

                await OnboardingServices.sendAlertEmails(currentAlerts);
            }
        }catch(error){
            console.error('Error checking alerts:', error);
        }
    }
    
    const handleSearch = async ( { term, welcomeOnboardingState:searchWelcomeStatus, technicalOnboardingState: searchTechnicalStatus }) => {
        try{
            setSearchTerm(term);
            setWelcomeOnboardingState(searchWelcomeStatus);
            settechnicalOnboardingState(searchTechnicalStatus);
            console.log(welcomeOnboardingState)
            const filtered = await OnboardingServices.getCollaborators( {
                searchTerm : term,
                welcomeOnboardingState : searchWelcomeStatus,
                technicalOnboardingState : searchTechnicalStatus
            });
            setFilteredCollaborators(filtered)
        }catch(error){
            console.error('Error searching tasks: ', error)
        }
    };

    const saveCollaborator = async ( collaboratorData ) => {
        try{
            let savedCollaborator;

            if( collaboratorData.id ) {
                savedCollaborator = await OnboardingServices.updateCollaborator(collaboratorData);
                setCollaborators(prevCollaborators => 
                    prevCollaborators.map(c => c.id === collaboratorData.id ? savedCollaborator : c)
                );
            }else{
                savedCollaborator = await OnboardingServices.addCollaborator(collaboratorData);
                setCollaborators(prevCollaborators => [...prevCollaborators, savedCollaborator]);
            }
            await handleSearch({
                term : searchTerm,
                welcomeOnboardingState : welcomeOnboardingState,
                technicalOnboardingState : technicalOnboardingState
            });      
            
            closeModal();
            await checkAlerts();
        }catch(error){
            console.error('Error saving collaborator: ', error)
        }
    };

    const deleteCollaborator = async (collaboratorId) => {
        if(window.confirm('Estas seguro de eliminar esta tarea?')){
            try{
                await OnboardingServices.deleteCollaborator(collaboratorId);
                setCollaborators(prevCollaborators => prevCollaborators.filter(c => c.id !== collaboratorId));

                await handleSearch({
                    term : searchTerm,
                    welcomeOnboardingState : welcomeOnboardingState,
                    technicalOnboardingState : technicalOnboardingState
                });
            }catch(error){
                console.error('Error deleting collaborator: ', error);
            }
        }
    };

    const editCollaborator = (collaboratorId) =>{
        const collaboratorToEdit = collaborators.find(c => c.id === collaboratorId);
        setSelectedCollaborator(collaboratorToEdit);
        setShowModal(true);
    };

    const closeModal = ()=>{
        setShowModal(false);
        setSelectedCollaborator(null);
    };

    const closeAlerts = () => {
        setShowAlerts(false);
    }

    return (

        <div className="onboarding-manager">

            {showAlerts && alerts.length > 0 && (
                <div className='alerts-overlay'>
                    <div className='alerts-header'>
                        <h3>Alertas de Onboarding</h3>
                        <button className='close-alerts' onClick={closeAlerts}>x</button>
                    </div>
                    <div className='alerts-content'>
                        {alerts.map((alert, index) =>(
                            <div key={index} className='alert-item'>
                                <div className='alert-info'>
                                    <strong>{alert.collaborator.name}</strong>
                                    <span className='alert-type'>
                                        {alert.type === 'welcome' ? ' Onboarding de Bienvenida ' : 'Onboarding tecnico'}
                                    </span>
                                    <span className='alert-date'>
                                        {alert.date.toLocaleDateString('es-ES')}
                                    </span>
                                    <span className={`alert-days ${alert.daysRemaining === 0 ? 'urgent' : ''}`}>
                                        {alert.daysRemaining === 0 ? 'HOY!' : `${alert.daysRemaining} dias restantes`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className='alerts-note'>
                        Las alertas han sido enviadas por correo automaticamente
                    </p>
                </div>
            )}

             <div className="header-section">
                <h1>Gestión de Onboarding</h1>
            </div>

            <div className="tabs-container">
                <button 
                    className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    Lista de Colaboradores
                </button>
                <button 
                    className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
                    onClick={() => setActiveTab('calendar')}
                >
                    Calendario de Onboardings
                </button>
            </div>

            {activeTab === 'list' ? (
                <div className="list-view">
                    <OnboardingSearch onSearch={handleSearch} />

                    <button 
                        onClick={() => setShowModal(true)} 
                        className="add-button"
                    >
                        Agregar Colaborador
                    </button>

                    <OnboardingTable
                        properties={filteredCollaborators}
                        onEdit={editCollaborator}
                        onDelete={deleteCollaborator}
                    />

                    <div>
                        <br></br>
                        <button 
                            className="check-alerts-btn"
                            onClick={checkAlerts}
                            title="Verificar alertas manualmente"
                        >
                            Verificar Alertas
                        </button>
                    </div>

                    {showModal && (
                        <OnboardingModal
                            collaborator={selectedCollaborator}
                            onClose={closeModal}
                            onSave={saveCollaborator}
                        />
                    )}
                </div>


            ) : (
                <div className="calendar-view">
                    <OnboardingCalendar collaborators={filteredCollaborators} />
                </div>
            )}

            <style jsx>{`
                .onboarding-manager {
                    padding: 20px;
                    max-width: none;
                    margin: 0;
                    width: 100vw;
                    min-height: 100vh;
                }

                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .header-section h1 {
                    margin: 0;
                    color:rgb(255, 255, 255);
                }

                .check-alerts-btn {
                    padding: 8px 16px;
                    background: #f59e0b;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background 0.2s;
                }

                .check-alerts-btn:hover {
                    background: #d97706;
                }

                .alerts-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    backdrop-filter: blur(4px);
                }

                .alerts-modal {
                    background: white;
                    border-radius: 16px;
                    padding: 0;
                    max-width: 650px;
                    width: 90%;
                    max-height: 80vh;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    border: 1px solid #e5e7eb;
                }

                .alerts-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px 28px 20px;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                }

                .alerts-header h3 {
                    margin: 0;
                    color: white;
                    font-size: 22px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .close-alerts {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: white;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }

                .close-alerts:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                }

                .alerts-content {
                    padding: 24px 28px;
                    max-height: 60vh;
                    overflow-y: auto;
                }

                .alert-item {
                    padding: 20px;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    margin-bottom: 16px;
                    background: #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    transition: all 0.2s ease;
                    border-left: 4px solid #ef4444;
                }

                .alert-item:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transform: translateY(-1px);
                }

                .alert-item:last-child {
                    margin-bottom: 0;
                }

                .alert-info {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 12px;
                    align-items: start;
                }

                .alert-details {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .alert-info strong {
                    font-size: 18px;
                    color: #111827;
                    font-weight: 600;
                }

                .alert-type {
                    color: #6b7280;
                    font-weight: 500;
                    font-size: 14px;
                    background: #f3f4f6;
                    padding: 4px 12px;
                    border-radius: 20px;
                    display: inline-block;
                    width: fit-content;
                }

                .alert-date {
                    color: #9ca3af;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .alert-date::before {
                    content: "📅";
                    font-size: 12px;
                }

                .alert-days {
                    font-weight: 700;
                    color: #ef4444;
                    background: #fef2f2;
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: 1px solid #fecaca;
                    font-size: 14px;
                    text-align: center;
                    min-width: 120px;
                }

                .alert-days.urgent {
                    color: #ffffff;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    border-color: #dc2626;
                    animation: pulse 2s infinite;
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                .alerts-note {
                    margin: 0 28px 24px;
                    padding: 16px 20px;
                    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                    border-radius: 12px;
                    color: #1e40af;
                    font-size: 14px;
                    border: 1px solid #bfdbfe;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }

                .note-icon {
                    font-size: 18px;
                    flex-shrink: 0;
                }

                .alerts-note strong {
                    display: block;
                    margin-bottom: 4px;
                    color: #1e40af;
                }

                .alerts-note p {
                    margin: 0;
                    color: #3730a3;
                    line-height: 1.4;
                }

                .tabs-container {
                    display: flex;
                    margin-bottom: 24px;
                    border-bottom: 2px solid #e5e7eb;
                }

                .tab-button {
                    padding: 12px 24px;
                    background: none;
                    border: none;
                    border-bottom: 3px solid transparent;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    color: #6b7280;
                    transition: all 0.2s ease;
                }

                .tab-button:hover {
                    color: #374151;
                    background-color: #f9fafb;
                }

                .tab-button.active {
                    color: #3b82f6;
                    border-bottom-color: #3b82f6;
                    background-color: #eff6ff;
                }

                .list-view {
                    animation: fadeIn 0.3s ease-in;
                }

                .calendar-view {
                    animation: fadeIn 0.3s ease-in;
                    width: 75%;
                    height: 75%;
                    padding: 0;
                    margin: 0;
                }

                .calendar-view :global(.fc) {
                    height: 100% !important;
                    width: 100% !important;
                }

                .calendar-view :global(.fc-view-harness) {
                    height: 100% !important;
                }

                .calendar-view :global(.fc-daygrid) {
                    height: 100% !important;
                }

                .calendar-view :global(.fc-scrollgrid) {
                    height: 100% !important;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .add-button {
                    margin: 20px 0;
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s ease;
                }

                .add-button:hover {
                    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }

                .add-button:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>

    );

}
export default OnboardingManager;