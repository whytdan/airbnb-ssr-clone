import classes from '../../styles/houses.module.scss';
import HomeCard from '../HomeCard';

export default function HomeList({
  homes,
  lastHomeElementRef,
  loading,
  error,
}) {
  return (
    <div className={classes.list}>
      {homes.map((home, index) =>
        homes.length === index + 1 ? (
          <HomeCard ref={lastHomeElementRef} key={home.id} data={home} />
        ) : (
          <HomeCard key={home.id} data={home} />
        )
      )}
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка!</p>}
    </div>
  );
}
