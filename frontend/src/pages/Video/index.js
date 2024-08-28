import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';

export default function VideoPlayer({ match }) {
  // Curso
  const idCurso = get(match, 'params.id', '');

  // Video
  const [urlVideo, setuUrlVideo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idCurso) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/cursos/${idCurso}`);
        const url = get(data, 'VideoCursos[0].url', '');

        if (!url) {
          toast.error('Este vídeo está indisponível no momento');
          history.push('/perfil');
        }

        setuUrlVideo(url);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/home');
      }
    }

    getData();
  }, [idCurso]);

  return (
    <>
      <Loading isLoading={isLoading} />

      <Container>
        <div style={{ width: '400px' }}>
          {/* eslint-disable-next-line */}
          <video
            src={urlVideo}
            controls
            style={{ width: '100%', height: 'auto' }}
          >
            <source src={urlVideo} type="video/mp4, video/mov" />
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        </div>
      </Container>
    </>
  );
}

VideoPlayer.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
