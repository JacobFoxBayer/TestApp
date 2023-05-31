import React from 'react'
import '@element/themes/bayer';
import ReactDOM from 'react-dom'
import navbar from '@monsantoit/phoenix-navbar'
import Routes from './routes'
import '../styles/style.scss'
import '@element/themes/velocity'

const suiteId = 'velocity'
const render = () => {
    const app = <Routes />
    const contentRoot = document.querySelector('.contents')
    ReactDOM.render(app, contentRoot);
}

navbar.install({
    element: document.querySelector('.nav'),
    suiteId,
    productId: 'test',
    cookieName: 'test-np'
}).then(() => {
    render()
}).catch((e) => {
    console.error(e);
});

