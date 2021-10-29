import { Formik } from 'formik'

export default function Players() {
  return (
    <main>
      <Formik initialValues={{ q: '' }} onSubmit={(val) => console.log(val)}>
        {(props) => (
          <div className="ui-search-wrapper">
            <form onSubmit={props.handleSubmit} className="ui-search-form">
              <div className="ui-search-inputwrapper">
                <input
                  type="text"
                  name="q"
                  value={props.initialValues.q}
                  autoComplete="off"
                  onChange={props.handleChange}
                />
              </div>
            </form>
          </div>
        )}
      </Formik>
    </main>
  )
}
