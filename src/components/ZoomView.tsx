import {FC, PropsWithChildren} from 'react';
import {View, PanResponder, Dimensions} from 'react-native';

const ZoomView: FC<
  PropsWithChildren<{
    onZoomProgress: (number: number) => void;
    onZoomStart: () => void;
    onZoomEnd: () => void;
  }>
> = ({onZoomProgress, onZoomStart, onZoomEnd, children}) => {
  const _panResponder = PanResponder.create({
    onPanResponderMove: (e, {dy}) => {
      const {height: windowHeight} = Dimensions.get('window');
      return onZoomProgress(
        Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5),
      );
    },
    onMoveShouldSetPanResponder: (ev, {dx}) => {
      return dx !== 0;
    },
    onPanResponderGrant: () => {
      return onZoomStart();
    },
    onPanResponderRelease: () => {
      return onZoomEnd();
    },
  });

  return (
    <View style={{flex: 1, width: '100%'}} {..._panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default ZoomView;
