import { Formik, FormikHelpers } from 'formik'

const Searchbar = (props: any) => {

    const handleRequest = (data: { searchQueryInput: string }, actions: FormikHelpers<{ searchQueryInput: string }>) => {
        props.history.push('/view/' + data.searchQueryInput + '/overview');
    }

    // this will be a very important part of the navigation on the page

    return (
        <div>
            <Formik
                initialValues={{ searchQueryInput: '' }}
                onSubmit={handleRequest}
            >
                {
                    ({ handleSubmit, values, handleChange }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="wrapper">
                                <div className="searchBar">
                                    <input
                                        id="searchQueryInput"
                                        type="text"
                                        name="searchQueryInput"
                                        placeholder="Search"
                                        value={values.searchQueryInput}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )
                }
            </Formik>
            { /* <Results/> cant serve these yet! */}
        </div>
    )
}

export { Searchbar };
