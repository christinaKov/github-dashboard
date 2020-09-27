import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './RepositoryDetail.css';

function RepositoryDetail({ match }) {
    const [name, setName] = useState('');
    const [starsCount, setStarsCount] = useState();
    const [lastCommit, setLastCommit] = useState('');
    const [avatar, setAvatar] = useState(``);
    const [ownerName, setOwnerName] = useState('');
    const [ownerLink, setOwnerLink] = useState(``);
    const [description, setDescription] = useState('');

    const [languagesUrl, setLanguagesUrl] = useState(``);
    const [listOfLanguages, setListOfLanguages] = useState([]);

    const [contributorsUrl, setContributorsUrl] = useState(``);
    const [listOfContributors, setListOfContributors] = useState([]);

    const [fetchInProgress, setFetchInProgress] = useState(false);

    // Getting info about repository after page reload and when languages and contributors URLs are loaded.
    useEffect(() => {
        fetchPosts();
        document.title = 'Карточка репозитория';
    }, [languagesUrl, contributorsUrl])
    
    const fetchPosts = async () => {
        setFetchInProgress(true);
        const response = await fetch(`https://api.github.com/repositories/${match.params.id}`);
        const data = await response.json();
        setName(data.name);
        setStarsCount(data.stargazers_count);
        setLastCommit(data.pushed_at);
        setAvatar(data.owner.avatar_url);
        setOwnerName(data.owner.login);
        setOwnerLink(data.owner.html_url);
        setDescription(data.description);
        setLanguagesUrl(data.languages_url);
        setContributorsUrl(data.contributors_url);

        // Getting languages list 
        const responseLangUrl = await fetch(languagesUrl);
        const dataLangUrl = await responseLangUrl.json();
        setListOfLanguages(Object.keys(dataLangUrl));

        // Getting contributors list
        const responseContributorsUrl = await fetch(contributorsUrl);
        const dataContributorsUrl = await responseContributorsUrl.json();
        setListOfContributors(dataContributorsUrl.map(contributor => (
            contributor.login
        )));

        setFetchInProgress(false);
    }

    return(
        <div className='repository-page'>
            {/* If all three API are loaded, returning info about the repository */}
            {fetchInProgress
                ?   <div className='repository-card'>загружаем данные, подождите немного</div>
                :   <div className='repository-card'>
                        <h1>{name}</h1>
                        <p>Количество звезд: {starsCount}, дата последнего коммита: {lastCommit.substring(0, 10)}</p>
                        <div className='about-author'>
                            <img className='user-pic' src={avatar} alt="profile-pic"/>
                            <p className='owner-link'><a href={ownerLink} target='_blank'>{ownerName}</a></p>
                        </div>
                        <p>Описание: {description}</p>
                        {/* Returning languages list if isn't empty */}
                        {listOfLanguages.length > 0
                            ?   <div className='list-of-languages'>
                                    <p>Список используемых языков в репозитории:</p>
                                    <ul>
                                        {listOfLanguages.map(language => (
                                            <li key={language}>{language}</li>
                                        ))}
                                    </ul>
                                </div>
                            :   <div className='list-of-languages'></div>
                        }
                        {/* Returning contributors list if isn't empty */}
                        {(listOfContributors.length > 0)
                            ?   <div className='list-of-contributors'>
                                    <p>10 наиболее активных контрибьюторов:</p>
                                    <ul>
                                        {listOfContributors.slice(0, 10).map(contributor => (
                                            <li key={contributor}>{contributor}</li>
                                        ))}
                                    </ul>
                                </div>
                            :   <div className='list-of-contributors'></div>
                        }

                        <Link to='/'><button className='back-to-search-btn'>Вернуться к поиску</button></Link>
                    </div>
            }
            
        </div>
    );
}

export default RepositoryDetail;