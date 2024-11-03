import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import getImages from '../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default function ImageGallery({ onClick, inputValue, page, loadMoreBtn }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!inputValue) return; 
    setStatus('pending');

    const fetchImages = async () => {
      try {
        const response = await getImages(inputValue, page);
        if (response.hits.length === 0) {
          alert('No results found');
          setStatus('idle');
          return;
        }

        setImages(prevImages => {
          const newImages = response.hits.filter(
            img => !prevImages.some(prevImg => prevImg.id === img.id)
          );
          return [...prevImages, ...newImages];
        });

        setStatus('resolve');
      } catch (error) {
        setStatus('rejected');
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [inputValue, page]); 

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolve') {
    return (
      <>
        <ul className={s.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
        {images.length !== 0 && <Button onClick={loadMoreBtn} />}
      </>
    );
  }

  return null;
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMoreBtn: PropTypes.func.isRequired,
};
