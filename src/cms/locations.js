import React, { Component } from "react";
import CMS from 'netlify-cms-app';
import styled from "styled-components";

const defaultSeparator = "\n\n---\n\n";

const CommandBar = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const CommandBarButton = styled.button`
  font-size: 12px;
  background: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  &:hover {
    background: #ddd;
  }
`;

const getLocationActions = (onChange, locations, i) => {
    const locationsCopy = locations.slice();

    return {
        createLocationAbove: () => {
            locationsCopy.splice(i, 1, "", locations[i]);
            return onChange(locationsCopy);
        },
        createLocationBelow: () => {
            locationsCopy.splice(i + 1, 0, "");
            return onChange(locationsCopy);
        },
        deleteLocation: () => {
            locationsCopy.splice(i, 1);
            return onChange(locationsCopy);
        },
        moveLocationUp: () => {
            if (i === 0) {
                return onChange(locationsCopy);
            }
        },
        moveLocationDown: () => {
            if (i === locationsCopy.length) {
                return onChange(locationsCopy);
            }
            locationsCopy.splice(i, 2, locations[i + 1], locations[i]);
            return onChange(locationsCopy);
        }
    };
};

const LocationCommandBar = props => (
    <CommandBar>
        <CommandBarButton onClick={props.createLocationAbove}>
            + Above
        </CommandBarButton>
        <CommandBarButton onClick={props.createLocationBelow}>
            + Below
        </CommandBarButton>
        <CommandBarButton onClick={props.deleteLocation}>
            Delete
        </CommandBarButton>
        <CommandBarButton onClick={props.moveLocationUp}>
            Move Up
        </CommandBarButton>
        <CommandBarButton onClick={props.moveLocationDown}>
            Move Down
        </CommandBarButton>
    </CommandBar>
);



const LocationControlHeader = styled.div`
    text-transform: uppercase;
    border-bottom: 1px solid black;
    margin-top: 20px;
`;

const LocationControl = props => {
    const MarkdownControl = CMS.getWidget("markdown").control;
    return (
        <div>
            <LocationControlHeader>Location</LocationControlHeader>
            <LocationCommandBar {...props.commandBarActions} />
            <MarkdownControl {...props} />
        </div>
    )
};

const LocationPreview = props => {
    const MarkdownPreview = CMS.getWidget("markdown").preview;
    return <div><hr /><MarkdownPreview {...props} /></div>;
};

export class LocationsControl extends Component {
    getValue() {
        return this.props.value ? this.props.value : "";
    }

    handleLocationChange(value, i) {
        const newValues = this.getValue().split(
            this.props.field.get("separator", defaultSeparator)
        );
        newValues[i] = value;
        this.props.onChange(
            newValues.join(this.props.field.get("separator", defaultSeparator))
        );
    }

    getLocationCommandBarActions(locations, i) {
        return getLocationActions(
            newLocations =>
                this.props.onChange(
                    newLocations.join(this.props.field.get("separator", defaultSeparator))
                ),
            locations,
            i
        );
    }

    render() {
        const locations = this.getValue().split(
            this.props.field.get("separator", defaultSeparator)
        );
        const locationControls = locations.map((locationContent, i) => (
            <LocationControl
                {...this.props}
                key={i}
                value={locationContent}
                onChange={value => this.handleLocationChange(value, i)}
                commandBarActions={this.getLocationCommandBarActions(locations, i)}
            />
        ));
        return <div>{locationControls}</div>;
    }
}

export const LocationsPreview = props => (
    <div>
        {props.value
            .split(props.field.get("separator", defaultSeparator))
            .map((val, i) => <LocationPreview {...props} key={i} value={val} />)}
    </div>
);