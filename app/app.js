import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faUserTie, faClock, faCalendarAlt, faFrown, faSmile, faMobileAlt, faAddressBook, faSignOutAlt, faPencilAlt, faBook, faUserEdit, faSpinner, faAddressCard, faListAlt, faChartArea } from '@fortawesome/free-solid-svg-icons'
import App from './containers/App'
import store from './store'
import history from './utils/history'

library.add(faUserTie, faEnvelope, faClock, faCalendarAlt, faFrown, faSmile, faMobileAlt, faAddressBook, faSignOutAlt, faPencilAlt, faChartArea, faBook, faUserEdit, faSpinner, faAddressCard, faListAlt)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
