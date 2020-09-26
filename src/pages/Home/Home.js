import React from 'react'
import { Spin, Modal, message, Button } from "antd"
import * as BooksAPI from '../../utils/BooksAPI'
import BookService from '../../service/book'

import { groupBy } from '../../utils'
import BookItem from '../../components/BookCard/BookCard'
import './Home.css'

class BooksApp extends React.Component {
    state = {
        bookList: [],
        visible: window.location.pathname === '/home' ? false : true,
        videoVisible: false
    }

    componentDidMount() {
        this.getBookList()
    }


    // getBookList = async () => {
    //     let bookList = await BooksAPI.getAll()

    //     let bookGroups = groupBy(bookList, 'shelf')
    //     this.setState({
    //         bookList: bookList,
    //         bookGroups: bookGroups
    //     })
    // }

    //请求列表数据
    getBookList = async () => {

        const { success, data, msg } = await BookService.getList()
        if (success) {
            this.setState({
                bookList: data,
            })
        } else {
            message.error(`${msg}`)
        }

    }

    handleOk = e => {
        this.setState({
            visible: false,
            videoVisible: true
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    videoHandleCancel = () => {
        this.setState({
            videoVisible: false,
        });
    }

    render() {
        const { bookList, visible, videoVisible } = this.state
        return (
            <div className="home-books-results">
                {(!videoVisible && !visible) && <Spin tip="加载中..." spinning={bookList.length > 0 ? false : true}>
                    <ol className="books-grid">
                        {
                            // 🔧 fix2:  Search results are not shown when all of the text is deleted out of the search input box.
                            bookList.map(bookItem => <BookItem key={bookItem.id} bookList={bookList} getBookList={this.getBookList} bookItem={bookItem} />)
                        }
                    </ol>
                </Spin>}
                <Modal
                    title={null}
                    visible={visible}
                    onOk={this.handleOk}
                    closable={false}
                    onCancel={this.handleCancel}
                    bodyStyle={{ textAlign: 'center' }}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确定
                        </Button>]}
                >
                    开始实验前请您观看本系统教学视频
                </Modal>
                <Modal
                    title={null}
                    width={'70%'}
                    visible={videoVisible}
                    onCancel={this.videoHandleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <video style={{ width: '100%', height: '100%', outline: 'unset' }} controls>
                        <source src='/video.mp4' type="video/mp4" />
                    </video>
                </Modal>
            </div>
        )
    }
}

export default BooksApp
