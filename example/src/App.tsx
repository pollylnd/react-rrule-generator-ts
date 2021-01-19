import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextareaAutosize from 'react-autosize-textarea';

import ReactRRuleGenerator, { translations } from 'react-rrule-ts';
import './bootstrap.min.css';
import 'react-rrule-ts/dist/index.css';
import './index.css';
import format from 'date-fns/format'
import subDays from 'date-fns/subDays';

class App extends Component {
  state = {
    rrule: `DTSTART:${format(subDays(new Date(), 1), 'yyyyMMdd') +'T200000Z'}\nFREQ=YEARLY;BYMONTH=1;BYMONTHDAY=1`,
    isCopied: false,
    language: 'en',
  };

  getTranslation = () => {
    switch (this.state.language) {
      case 'ru': return translations.russian;
      case 'en': return translations.english;
      case 'de': return translations.german;
      default: return translations.english;
    };
  };

  handleChangeLanguage = (event: any) => {
    event.persist();
    const newLanguage = event.target.value;
    this.setState({ language: newLanguage });
  };

  handleChange = (newRRule: any) => {
    this.setState({ rrule: newRRule, isCopied: false });
  };

  handleCopy = () => {
    this.setState({ isCopied: true });
  };

  render() {
    const { rrule, isCopied } = this.state;
    return (
      <div>
        <div className="app-navbar">
          <a href="https://github.com/fafruch/react-rrule-generator">
            &lt; go back to
            {' '}
            <img className="app-navbar-ghlogo" src="" alt="Github logo" />
            /fafruch
          </a>

          <iframe
            title="github-star"
            src="https://ghbtns.com/github-btn.html?user=fafruch&repo=react-rrule-generator&type=star&count=true&size=medium"
            frameBorder="0"
            scrolling="0"
            width="78px"
            height="20px"
          />
        </div>
        <div className="app-header">
          <h1>React RRule Generator</h1>
        </div>

        <div className="app-desc">
          Recurrence rules generator form built with React
        </div>

        <div className="app container">
          <h5><strong>{'<RRuleGenerator />'}</strong></h5>

          <ReactRRuleGenerator
            onChange={this.handleChange as any}
            value={this.state.rrule as string}
            config={{
              hideStart: false,
            } as any}
            translations={this.getTranslation() as any}
          />
        </div>

        <hr className="mt-5 mb-5" />

        <div className="container">
          <h5><strong>Example handling</strong></h5>

          <div className="px-3 pt-3 border rounded">
            <div className="form-group row d-flex align-items-sm-center">

              <div className="col-sm-2 text-sm-right">
                <span className="col-form-label">
                  <strong>
                    RRule
                  </strong>
                </span>
              </div>

              <div className="col-sm-8">
                <TextareaAutosize
                  className={`form-control rrule ${isCopied ? 'rrule-copied' : 'rrule-not-copied'}`}
                  value={rrule}
                  readOnly
                />
              </div>

              <div className="col-sm-2">
                <CopyToClipboard
                  text={rrule}
                  onCopy={this.handleCopy}
                >
                  <button
                    aria-label="Copy generated RRule"
                    className={`btn ${isCopied ? 'btn-secondary' : 'btn-primary'} float-right`}
                  >
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                </CopyToClipboard>
              </div>

            </div>
          </div>
        </div>

        <hr className="mt-5 mb-5" />

        <div className="container mb-5">
          <h5><strong>Config</strong></h5>
          <div className="px-3 pt-3 border rounded">
            <div className="form-group row d-flex align-items-sm-center">
              <div className="col-sm-2 text-sm-right">
                <span className="col-form-label">
                  <strong>
                    Language
                  </strong>
                </span>
              </div>

              <div className="col-sm-8">
                <select className="form-control" value={this.state.language} onChange={this.handleChangeLanguage}>
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="ru">Russian</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
