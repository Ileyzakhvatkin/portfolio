import './main.global.css';
import './img/favicon.svg';

import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { MainPage } from './shared/MainPage';
import { StatPage } from './shared/StatPage';
import { NotFound } from './shared/NotFound';
import { Footer } from './shared/Footer';

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, updateTasksList, updateTimesList, updateTmpl } from './stor/stor';
import { saveToLocalStorage } from './shared/Utils/js/saveToLocalStorage';
import { loadFromLocalStorage } from './shared/Utils/js/loadFromLocalStorage';
import { Tmpl } from './shared/Tmpl';
import { loadFromStorTmpl } from './shared/Utils/js/loadFromStorTmpl';
import { useIsMouned } from './hooks/useIsMouned';

const store = createStore(rootReducer, composeWithDevTools());

if (typeof window !== 'undefined') {
  store.subscribe(() => saveToLocalStorage(store.getState(), 'tasks'));
}

function AppComponent() {
  const [ isMounted ] = useIsMouned();
  if (isMounted) {
    store.dispatch(updateTasksList(loadFromLocalStorage('tasks')));
    store.dispatch(updateTimesList(loadFromLocalStorage('times')));
    store.dispatch(updateTmpl(loadFromStorTmpl()));
  }

  const [ mounted, setMounted ] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider store={store}>
      { mounted && (
        <BrowserRouter>
          <Tmpl>
            <Header/>
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/statistics/" element={<StatPage/>} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </Layout>
            <Footer/>
          </Tmpl>
        </BrowserRouter>
      ) }
    </Provider>
  );
}

export const App = hot(() => <AppComponent />);
