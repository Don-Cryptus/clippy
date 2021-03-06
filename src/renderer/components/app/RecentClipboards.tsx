import { useEffect } from 'react';
import { Clipboard } from '@prisma/client';
import useAppStore from '../../store/AppStore';
import Clipboards from './Clipboards';

const RecentClipboards = () => {
  const clipboards = useAppStore((state) => state.clipboards);
  const setClipboards = useAppStore((state) => state.setClipboards);

  useEffect(() => {
    const getClipboards = async () =>
      setClipboards(await window.electron.getClipboards({}));
    getClipboards();
  }, [setClipboards]);

  useEffect(() => {
    const addClipboard = window.electron.on(
      'addClipboard',
      (clipboard: Clipboard) => setClipboards([clipboard, ...clipboards])
    );
    return () => {
      addClipboard();
    };
  }, [clipboards, setClipboards]);

  return <Clipboards />;
};

export default RecentClipboards;
