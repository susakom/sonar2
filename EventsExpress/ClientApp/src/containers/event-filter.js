import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reset } from 'redux-form';
import EventFilter from '../components/event/event-filter';
import get_categories from '../actions/category/category-list-action';
import eventHelper from '../components/helpers/eventHelper';
import { withRouter } from "react-router";

class EventFilterWrapper extends Component {
    componentWillMount() {
        this.props.get_categories();
    }

    onReset = () => {
        this.props.reset_filters();
        this.props.history.push(this.props.history.location.pathname + "?page=1")
    }

    onLoadUserDefaults = () => {
        this.props.reset_filters();
        const defaultFilter = {
            ...eventHelper.getDefaultEventFilter(),
            categories: this.props.current_user.categories.map(item => item.id),
        };
        const favoriteFilter = eventHelper.getQueryStringByEventFilter(defaultFilter);
        this.props.history.push(this.props.history.location.pathname + this.trimRadiusFromQueryString(favoriteFilter));
    }

    onSubmit = (filters) => {
        filters = eventHelper.trimUndefinedKeys(filters);
        var filterCopy = { ...this.props.events.filter };
        Object.entries(filters).forEach(function ([key, value]) {
            switch (key) {
                case 'page':
                    filterCopy[key] = value;
                case 'dateFrom':
                case 'dateTo':
                    filterCopy[key] = new Date(value).toDateString();
                    break;
                case 'categories':
                    filterCopy[key] = value.map(item => item.id);
                    break;
                case 'statuses':
                    filterCopy[key] = value;
                    break;
                case 'radius':
                    filterCopy[key] = value;
                    break;
                case 'selectedPos':
                    var x = value.lat;
                    var y = value.lng;
                    filterCopy['x'] = x;
                    filterCopy['y'] = y;
                    filterCopy[key] = undefined;
                    break;
                default:
                    filterCopy[key] = value;
                    break;
            }
        }.bind(this));
        const queryString = eventHelper.getQueryStringByEventFilter(filterCopy);

        if (filterCopy.x !== undefined && filterCopy.y !== undefined)
            this.props.history.push(this.props.history.location.pathname + queryString);
        else
            this.props.history.push(this.props.history.location.pathname + this.trimRadiusFromQueryString(queryString))
    }

    trimRadiusFromQueryString = (queryString) => {
        const radiusQueryString = "&radius=8";
        let trimQueryString = queryString.toString().replace(radiusQueryString, "");
        return trimQueryString;
    }

    buildInitialFormValues = () => {
        const filter = eventHelper.trimUndefinedKeys(this.props.events.filter);
        let values = Object.assign({}, filter);

        if (filter.categories.length) {
            values.categories = this.props.all_categories.data.filter(item =>
                filter.categories.some(filterItem => filterItem === item.id)
            );
        }
        return values;
    };

    render() {
        const initialFormValues = this.buildInitialFormValues();
        return <>
            <EventFilter
                all_categories={this.props.all_categories}
                onLoadUserDefaults={this.onLoadUserDefaults}
                onSubmit={this.onSubmit}
                onReset={this.onReset}
                form_values={this.props.form_values}
                current_user={this.props.current_user}
                initialFormValues={initialFormValues}
            />
        </>
    }
}

const mapStateToProps = (state) => ({
    all_categories: state.categories,
    events: state.events,
    form_values: getFormValues('event-filter-form')(state),
    current_user: state.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        get_categories: () => dispatch(get_categories()),
        reset_filters: () => dispatch(reset('event-filter-form')),
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilterWrapper));
