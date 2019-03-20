/**
 * miaoxiongtao@made-in-china.com
 * TODO:
 * [x] 简书 width 620，segmentfault (pad 720,pc 825) 知乎(690)，掘金(647)，InfoQ(760)， 文章最小宽度
 */

import React, { Component } from 'react';
import TurndownService from 'turndown';
import './index.scss';
import { connect } from 'react-redux';
import { AButton } from 'components';
const turndownService = new TurndownService();

const mapStateToProps = (state, ownProps) => {
    return {
        url: state.search_url,
        article: ownProps.article,
    };
};

class Article extends Component {
    state = {
        markdown: false,
    };
    shouldComponentUpdate(prev, newProps) {
        return true;
    }
    _downloadFile = function(content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };

    click(e) {
        let article = this.props.article;
        if (article) {
            let content = turndownService.turndown(article);
            console.log('content', content);
            this._downloadFile(content, 'test.md');
        }
    }

    render() {
        let { article } = this.props;
        // console.log('url',this.props.url)
        // console.log('article',article)
        // 支持网站：知乎、掘金、InfoQ、简书
        const main = this.props.url ? (
            <div
                id="D-article"
                className="article"
                dangerouslySetInnerHTML={{ __html: article }}
            />
        ) : (
            <p className="holder-text">
                截取网站文章，转成 markdown
                文件，支持网站：Segmentfault、知乎、掘金、InfoQ、简书
            </p>
        );
        return (
            <div className="article-container">
                {main}
                {this.props.article && (
                    <div style={{ marginTop: '12px' }}>
                        <AButton
                            type="default"
                            onClick={() => {
                                this.click();
                            }}
                        >
                            Markdown 下载
                        </AButton>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Article);
