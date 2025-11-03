  export const formatRuntime = (runtime: number | null | undefined) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  export const showChars = (text: string, length: number) => {
    console.log('text: length', text, length);
    if(text.length > length){
      return text.slice(0, length) + '...';
    }
    return text;
  }