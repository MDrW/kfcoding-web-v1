import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
import { Pagination } from 'antd';
import Book from '../../components/Book/Book';
import '../../common/config';

@connect(({ bookList, loading }) => ({
  bookList,
  loading: loading.models.data,
}))
export default class Page1 extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookList/fetchBooklist',
    });
  }

  onShowSizeChange(pageNumber, pageSize) {
    this.reFreshPage(pageNumber, pageSize);
  }

  onChange(pageNumber, pageSize) {
    this.reFreshPage(pageNumber, pageSize);
  }

  getTotalNumberOfBooks() {
    const { bookList } = this.props;
    return parseInt(bookList.total, 10);
  }

  reFreshPage(pageNumber, pageSize) {
    console.log(pageNumber, pageSize);
    const { dispatch } = this.props;
    const conditionResult = {
      bookTag: '',
    };
    console.log(conditionResult);
    dispatch({
      type: 'bookList/fetchUpdateBooklist',
      payload: { current: pageNumber, size: pageSize, condition: conditionResult },
    });
  }

  showBooks() {
    const { bookList } = this.props;
    const books = bookList.data.map(kf => {
      const viewhref = `/reader/${kf.id}`;
      return (
        <div style={{ float: 'left', marginRight: '40px', marginBottom: '40px' }} key={kf.id}>
          <a href={viewhref} style={{ display: 'block', width: '240px', height: '320px' }}>
            <Book key={kf.id} book={kf} />
          </a>
        </div>
      );
    });
    return books;
  }

  render() {
    const showBooks = this.showBooks();
    return (
      <div className="home-page-wrapper page3">
        <div className="indexPage">
          <h2>
            <Link to="/library/allBooks">功夫秘籍</Link>
          </h2>
        </div>
        <div style={{ marginLeft: '100px' }}>
          {showBooks}
          <Pagination
            style={{
              clear: 'both',
              display: 'block',
              margin: '0px auto',
              position: 'inherit',
              bottom: '0',
            }}
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange.bind(this)}
            onChange={this.onChange.bind(this)}
            defaultCurrent={global.paginationData.pageCurr}
            total={this.getTotalNumberOfBooks()}
          />
        </div>
      </div>
    );
  }
}
