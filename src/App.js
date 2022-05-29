import React from 'react'
import './App.css'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import BookDetails from './components/BookDetails'
import { BrowserRouter, Route, Switch } from "react-router-dom"

function BooksApp() {

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={ListBooks} />
          <Route exact path="/search" component={SearchBooks} />
          <Route path="/book/:id" component={BookDetails} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default BooksApp
