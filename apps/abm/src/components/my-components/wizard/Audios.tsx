import ComponentCard from '@/components/common/ComponentCard';
import Alert from '@/components/ui/alert/Alert';
import AudioList from './AudioList';
import { IAudio } from '@/types/postTypes';

interface NewAudioItem {
  url: string;
  title: string;
  description: string;
}

export default function Audios({
  audiosdb,
  setAudiosdb,
  newAudios,
  setNewAudios,
}: {
  audiosdb: IAudio[];
  setAudiosdb?: (newAuds: IAudio[]) => void;
  newAudios: NewAudioItem[];
  setNewAudios: (newAuds: NewAudioItem[]) => void;
}) {
  return (
    <ComponentCard title="Agregar Audios">
      <Alert
        variant="warning"
        message="Los audios deben ser enlaces válidos de SoundCloud y no deben ser acortados."
        title="Atención"
      />
      <AudioList
        audiosdb={audiosdb ?? []}
        setAudiosdb={setAudiosdb}
        newAudios={newAudios ?? []}
        setNewAudios={setNewAudios}
      />
    </ComponentCard>
  );
}
