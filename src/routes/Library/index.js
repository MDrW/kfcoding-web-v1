import React from 'react';
import { Pagination, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
import '../../common/config';
import Book from '../../components/Book/Book';
import { getConditionResult } from '../../utils/utils';

@connect(({ bookList, loading }) => ({
  bookList,
  loading: loading.models.data,
}))
class Library extends React.Component {
  componentDidMount() {
    this.reFreshPage(global.paginationData.pageCurr, global.paginationData.sizeOfPage);
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
    const { dispatch, match } = this.props;
    console.log(match.path);
    const conditionResult = getConditionResult(match.path);
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

  searchBook(value) {
    console.log();
    const { dispatch, match } = this.props;
    console.log(match.path);
    const conditionResult = getConditionResult(match.path);
    conditionResult.title = value;
    console.log(conditionResult);
    dispatch({
      type: 'bookList/fetchUpdateBooklist',
      payload: {
        current: global.paginationData.pageCurr,
        size: global.paginationData.sizeOfPage,
        condition: conditionResult,
      },
    });
  }

  render() {
    const showBooks = this.showBooks();
    const { bookList } = this.props;
    return (
      <div className="Library">
        <div style={{ marginLeft: '100px', marginTop: '40px' }}>
          <div>
            <Input.Search
              placeholder="请输入搜索标题"
              enterButton="搜索"
              size="large"
              onSearch={value => this.searchBook(value)}
            />
          </div>
          <div style={{ marginTop: '40px' }}>
            {bookList.data.length ? (
              showBooks
            ) : (
              <p>
                暂时还没有该类型的秘籍，你可以<Link to="/kongfu/create">创建一门编程秘籍</Link>
              </p>
            )}
          </div>
          <div>
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
      </div>
    );
  }
}

export default Library;
