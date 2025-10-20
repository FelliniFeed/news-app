import Skeleton from '../../components/Skeleton/Skeleton';

function withSkeleton(Component, type, count) {
  return function WithSkeleton(props) {
    const { isLoading, ...resProps } = props;
    if (isLoading) {
      return <Skeleton type={type} count={count} />;
    }
    return <Component {...resProps} />;
  };
}

export default withSkeleton;
