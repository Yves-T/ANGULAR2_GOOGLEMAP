export class Init {
  load() {
    if (!localStorage.getItem('markers')) {
      console.log('No markers found... Creating');
      let markers = [
        {
          name: 'company one',
          lat: 51.187438,
          lng: 5.117759,
          draggable: true
        }
      ];

      localStorage.setItem('markers', JSON.stringify(markers));
    } else {
      console.log('loading markers');
    }
  }
}
