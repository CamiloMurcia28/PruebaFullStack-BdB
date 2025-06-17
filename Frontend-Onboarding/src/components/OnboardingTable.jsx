import React from 'react';

const OnboardingTable = ({ properties, onEdit, onDelete }) => {

    return (
        <div className="onboarding-table-container">
            <h2>Listado de Colaboradores</h2>
            <table className="onboarding-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo electrónico</th>
                        <th>Fecha Ingreso</th>
                        <th>Estado Onboarding de Bienvenida</th>
                        <th>Estado Onboarding Técnico</th>
                        <th>Fecha de Onboarding Técnico</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((collaborator) =>
                        <tr key={collaborator.id}>
                            <td>{collaborator.name}</td>
                            <td>{collaborator.mail}</td>
                            <td>{collaborator.admissionDate}</td>
                            <td>
                                <span className={collaborator.welcomeOnboardingState ? 'completed' : 'pending'}>
                                    {collaborator.welcomeOnboardingState ? 'Completado' : 'Pendiente'}
                                </span>
                            </td>
                            <td>
                                <span className={collaborator.technicalOnboardingState ? 'completed' : 'pending'}>
                                    {collaborator.technicalOnboardingState ? 'Completado' : 'Pendiente'}
                                </span>
                            </td>
                            <td>{collaborator.assignedTechinicalOnboardingDate}</td>
                            <td>
                                <button 
                                onClick={() => onEdit(collaborator.id)} 
                                className="edit-btn"
                                >
                                Editar
                                </button>
                                <button 
                                onClick={() => onDelete(collaborator.id)} 
                                className="delete-btn"
                                >
                                Borrar
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <style jsx>{`
                .task-table-container {
                margin-top: 20px;
                }

                .task-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                }

                th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ddd;
                }

                th {
                background-color: #242424;
                font-weight: bold;
                }

                .edit-btn, .delete-btn {
                padding: 5px 10px;
                margin: 0 5px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                }

                .edit-btn {
                background-color: #4CAF50;
                color: white;
                }

                .edit-btn:hover {
                background-color: #45a049;
                }

                .delete-btn {
                background-color: #f44336;
                color: white;
                }

                .delete-btn:hover {
                background-color: #d32f2f;
                }

                .completed {
                background-color: #4CAF50;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                }

                .pending {
                background-color: #ff9800;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                }

                tbody tr:hover {
                background-color: #f5f5f5;
                }
            `}</style>
        </div>
    );

};
export default OnboardingTable;