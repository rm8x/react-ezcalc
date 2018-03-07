import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import { Column, Box, Flex } from 'rebass';
import Button from '../../components/Button';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


class ButtonBanksGridLayout extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    verticalCompact: true,
    isDraggable: true,
    isResizable: false,
    rowHeight: 4,
    onLayoutChange() {},
    cols: { lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 },
    rows: 22
  };

  constructor(props) {
    super(props);
    this.state = { 
        
     };
  }

  generateDOM() {
    const layout = this.generateLayout();
    return _.map(layout, function(l) {
      return (
        <div key={l.i} data-grid={l}>
              {l.component ? 
                 l.component 
                 : <Button width="100%" height="100%">{l.i}</Button> }
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(p.items, function(item, i) {
    const minW = item.w;
    const minH = item.h;
    const w = minW;
    const y = minH;
      return {
        x: (i * 6) % 24,
        y:  y,
        w,
        h: y,
        i: i.toString(),
        minW,
        minH,
        component: item.component ? item.component : null
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
        <ResponsiveReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
    );
  }

}

export default ButtonBanksGridLayout;