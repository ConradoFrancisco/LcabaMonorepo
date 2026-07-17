import ComponentCard from '@/components/common/ComponentCard';
import Alert from '@/components/ui/alert/Alert';
import VideoPreviewInput from './VideoList';
interface VideoItem {
  id: number;
  fk_id: number;
  url: string;
  title: string;
  description: string;
  iduser_ins: number;
  date_ins: string;
  iduser_upd: number | null;
  date_upd: string | null;
  orderby: number;
}

interface NewVideoItem {
  url: string;
  title: string;
  description: string;
}

export default function Videos({
  videosdb,
  setVideosdb,
  newVideos,
  setNewVideos,
  table = 'magazine_',
}: {
  videosdb: VideoItem[];
  setVideosdb?: (newVids: VideoItem[]) => void;
  newVideos?: NewVideoItem[];
  setNewVideos: (newVids: NewVideoItem[]) => void;
  // Prefijo de sección: Prensa -> ' ' | Cultura -> 'cultura_' | Revista -> 'magazine_'
  table?: string;
}) {
  return (
    <ComponentCard title="Agregar Videos">
      <Alert
        variant="warning"
        message="Los videos deben estar formateados de la siguiente forma: https://www.youtube.com/watch?v=ro8aQmOjGxI"
        title="Atención"
      />
      <VideoPreviewInput
        videosdb={videosdb}
        setVideosdb={setVideosdb}
        newVideos={newVideos}
        setNewVideos={setNewVideos}
        table={table}
      />
    </ComponentCard>
  );
}
