import React from 'react';
import { connect } from 'dva';
import Classify from '../components/index/Classify'
import TimeLimit from '../components/index/TimeLimit'
import Hot from '../components/index/Hot'
import IndexBanner from '../components/index/IndexBanner'
import IndexList from '../components/index/IndexList'
import SearchBarExample from '../components/index/SearchBarExample'
import '../assets/css/common.css'
import styles from '../components/index/index.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'

function IndexPage() {
  
  return (
    <section>
        <div className={styles.wBlock}>
            {/* 搜索 */}
            <SearchBarExample/>
            
            {/* banner */}
            <IndexBanner/>
            
        </div>
        {/* 分类 */}
        <div className={styles.wBlock}>
            <Classify/>
        </div>
        {/* 限时闪购 */}
        <div className={styles.wBlock}>
            <TimeLimit/>
        </div>
        
        {/* 热门 */}
        <div className={styles.wBlock}>
            <Hot/>
        </div>
        {/* 列表 */}
        <div className={styles.wBlock}>
            <IndexList/>
        </div>
    </section>
  );
}


IndexPage.propTypes = {
    
};

export default connect()(IndexPage);
