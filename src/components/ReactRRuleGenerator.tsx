import React, { PureComponent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import Start from './Start/index';
import Repeat from './Repeat/index';
import End from './End/index';
import computeRRuleToString from '../utils/computeRRule/toString/computeRRule';
import computeRRuleFromString from '../utils/computeRRule/fromString/computeRRule';
import configureInitialState from '../utils/configureInitialState';
import translateLabel from '../utils/translateLabel';
import '../styles/index.css';

export type Config = {
  frequency: 'Yearly' | 'Monthly' | 'Weekly' | 'Daily' | 'Hourly';
  yearly: 'on' | 'on the';
  monthly: 'Never' | 'After' | 'On date';
  end: 'Never' | 'After' | 'On date';
  hideStart: boolean;
  hideEnd: boolean;
  hideError: boolean;
  weekStartsOnSunday: boolean;
  repeat: any;
};

export interface Props {
  id?: string | null;
  config: any;
  onChange: any;
  calendarComponent?: any;
  translations: any;
  value: string;
}

class ReactRRuleGenerator extends PureComponent<Props> {
  // compute default view based on user's config
  state = configureInitialState({
    config: this.props.config,
    calendarComponent: this.props.calendarComponent,
    id: this.props.id
  });

  componentWillMount() {
    if (this.props.onChange === null) {
      // no onChange() was provided
      throw new Error(
        'No onChange() function has been passed to RRuleGenerator. \n' +
          "Please provide one, it's needed to handle generated value."
      );
    }

    if (this.props.value) {
      // if value is provided to RRuleGenerator, it's used to compute state of component's forms
      const data = computeRRuleFromString(this.state.data, this.props.value);
      this.setState({ data });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value) {
      const data = computeRRuleFromString(this.state.data, nextProps.value);
      this.setState({ data });
    }
  }

  handleChange = ({ target }: any) => {
    const newData = cloneDeep(this.state.data);
    set(newData, target.name, target.value);
    const rrule = computeRRuleToString(newData);
    this.setState({ data: newData });
    this.props.onChange(rrule);
  };

  render() {
    const {
      id,
      data: { start, repeat, end, options, error }
    } = this.state;

    return (
      <div>
        {!options.hideError && !!error && (
          <div className='alert alert-danger'>
            {translateLabel(this.props.translations, 'invalid_rrule', {
              // value: error.value
            })}
          </div>
        )}

        <div className='px-0 pt-3 border rounded'>
          {!options.hideStart && (
            <div>
              <Start
                id={`${id}-start`}
                start={start}
                handleChange={this.handleChange}
                translations={this.props.translations}
              />
              <hr />
            </div>
          )}

          <div>
            <Repeat
              id={`${id}-repeat`}
              repeat={repeat}
              handleChange={this.handleChange}
              translations={this.props.translations}
            />
          </div>

          {!options.hideEnd && (
            <div>
              <hr />
              <End
                id={`${id}-end`}
                end={end}
                handleChange={this.handleChange}
                translations={this.props.translations}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReactRRuleGenerator;
