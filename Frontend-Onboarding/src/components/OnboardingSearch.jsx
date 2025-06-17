import React, { useState } from 'react';

const OnboardingSearch = ({ onSearch }) => {

    const[searchTerm, setSearchTerm] = useState('');
    const[welcomeOnboardingState, setWelcomeOnboardingState] = useState('');
    const[technicalOnboardingState, settechnicalOnboardingState] = useState('');

    const handleSearch = () => {
        onSearch({
            term: searchTerm || '',
            welcomeOnboardingState: welcomeOnboardingState,
            technicalOnboardingState: technicalOnboardingState
        });
    };
    const handleKeyPress = (e) =>{
        if (e.key === 'Enter'){
            handleSearch();
        }
    }
    const handleWelcomeStatusChange = (e) => {
        const newStatus = e.target.value;
        setWelcomeOnboardingState(newStatus);
        onSearch({
            term: searchTerm || '',
            welcomeOnboardingState: newStatus,
            technicalOnboardingState: technicalOnboardingState
        });
    }
    const handleTechnicalStatusChange = (e) => {
        const newStatus = e.target.value;
        settechnicalOnboardingState(newStatus);
        onSearch({
            term: searchTerm || '',
            welcomeOnboardingState: welcomeOnboardingState,
            technicalOnboardingState: newStatus
        });
    }
    return(
        <div className="search-container">
            <div className="search-box">
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Buscar Tareas'
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Buscar
                </button>
            </div>
            <div className="filters">
                <select
                    value={welcomeOnboardingState}
                    onChange={handleWelcomeStatusChange}
                    className="status-filter"
                >
                    <option value="">Onboarding Bienvenida - Todos</option>
                    <option value="completed">Bienvenida - Completadas</option>
                    <option value="pending">Bienvenida - Pendientes</option>
                </select>

                <select
                    value={technicalOnboardingState}
                    onChange={handleTechnicalStatusChange}
                    className="status-filter"
                >
                    <option value="">Onboarding Técnico - Todos</option>
                    <option value="completed">Técnico - Completadas</option>
                    <option value="pending">Técnico - Pendientes</option>
                </select>
            </div>

            <style jsx>{`
                 .search-container {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    padding: 20px 0;
                }
                
                .search-box {
                    display: flex;
                    gap: 10px;
                    flex: 1;
                }
                
                .search-input {
                    flex: 1;
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }

                .search-input:focus {
                    border-color: #4CAF50;
                    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
                }

                .search-button {
                    padding: 8px 12px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.3s ease;
                }

                .search-button:hover {
                    background-color: #45a049;
                }

                .search-button:active {
                    background-color: #3d8b40;
                }

                .filters {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                    align-items: center;
                }

                .status-filter {
                    padding: 10px 12px;
                    border: 2px solid #555;
                    border-radius: 8px;
                    background-color: #2d2d2d;
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.3s ease;
                    min-width: 200px;
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-position: right 10px center;
                    background-repeat: no-repeat;
                    background-size: 16px;
                    padding-right: 35px;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }

                .status-filter:hover {
                    border-color: #4CAF50;
                    background-color: #3a3a3a;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .status-filter:focus {
                    border-color: #4CAF50;
                    background-color: #3a3a3a;
                    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
                }

                .status-filter option {
                    background-color: #2d2d2d;
                    color: white;
                    padding: 8px;
                }

                @media (max-width: 768px) {
                    .search-container {
                        flex-direction: column;
                        gap: 15px;
                    }

                    .search-box {
                        min-width: 100%;
                    }

                    .filters {
                        width: 100%;
                        flex-direction: column;
                    }

                    .status-filter {
                        width: 100%;
                        min-width: auto;
                    }
                }
            `}</style>
        </div>
    )
}
export default OnboardingSearch;
