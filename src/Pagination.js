import React, {useState} from 'react';

function Pagination({repositoriesPerPage, totalRepositories, paginate}) {
    const pageNumbers = [];
    const [active, setActive] = useState(1);

    for (let i = 1; i <= Math.ceil(totalRepositories / repositoriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div>
            {(pageNumbers.length > 1)
                ?   <div className='pagination'>
                        {pageNumbers.map(number => (
                            <a
                                className={active === number ? 'active' : ''}
                                key={number}
                                onClick={() => {
                                    paginate(number);
                                    setActive(number);
                                }}
                                href="#">{number}
                            </a>
                        ))}
                    </div>
                :   <div className='pagination'></div>
            }
            
        </div>
    );
}

export default Pagination;