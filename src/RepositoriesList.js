import React from 'react';
import {Link} from 'react-router-dom';

function RepositoriesList({repositories, fetchInProgress, backToPopular}) {
    return(
        <div className='repositories-list'>
            {/* If API is loaded and repositories are founded, returning a list of repositories */}
            {fetchInProgress 
                ?   <ul><li>загружаем репозитории, подождите немного</li></ul>
                :   (repositories.length > 0)
                    ?   <ul>
                            {repositories.map(repository => (
                                <li key={repository.id}>
                                    <ul className='repository-item'>
                                        <Link to={`/${repository.id}`} className='repository-link'>
                                            <li className='repository-name'>{repository.name}</li>
                                            <li>{repository.stargazers_count} звезд</li>
                                            <li>дата последнего коммита: {repository.pushed_at.substring(0, 10)}</li>
                                        </Link>
                                        <li className='repository-link'><a href={repository.html_url} target="_blank">ссылка на репозиторий</a></li>
                                    </ul>
                                </li>
                            ))}
                        </ul>   
                    :   <ul>
                            <li>к сожалению, ничего не найдено</li>
                            <button className='back-to-search-btn' onClick={backToPopular}>Вернуться к популярным репозиториям</button>
                        </ul>
            }
        </div>
    );
}

export default RepositoriesList;