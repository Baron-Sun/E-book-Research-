
import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import { message } from "antd"

import { connect } from 'react-redux';

import BooksAPI from '../../service/book'
import './BookCard.css'

class BookItemComponent extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    handleClick = (e, url, bookId) => {
        if (!url) {
            e.preventDefault();
            message.warning('请先完成前一本书')
        } else {
            BooksAPI.openBook({ bookId })
        }
    }

    render() {
        const { bookItem, bookList, users } = this.props;

        const { id, title, imageLinks = {}, authors = [], cover, url
        } = bookItem;

        return (
            <Fragment>
                <Link to={
                    {
                        pathname: `iframe/${id}`,
                        query: {
                            url: url,
                            bookId: id
                        }
                    }}>
                    <li key={id} onClick={(e) => this.handleClick(e, url, id)}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})`, backgroundSize: '100%' }}></div>
                            </div>
                            <div className="book-title">{title}</div>
                            <div className="book-authors">{authors.join()}</div>
                        </div>
                    </li>
                </Link>

            </Fragment>)
    }
}

export default connect(
    ({ users }) => ({
        users: Object.values(users)
    }))(BookItemComponent);
