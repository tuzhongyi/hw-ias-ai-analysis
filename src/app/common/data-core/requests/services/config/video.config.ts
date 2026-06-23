export interface VideoConfig {
  upload: VideoUpladConfig;
  videoUrl: string;
  playback: PlaybackConfig;
  preview: PreviewConfig;
}
interface VideoUpladConfig {
  suffix: string[];
}
interface PlaybackConfig {
  begin: number;
  end: number;
  stream: number;
}
interface PreviewConfig {
  stream: number;
}
