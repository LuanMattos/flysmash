/// <reference lib="webworker" />
addEventListener(
  "message",
  (e) => {
    const data = [];
    
    // const teta = new Promise((resolve, reject) => {
    //   Array.from(e.data.file).map(file => {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(<Blob>file);
    //     reader.onload = () => {
    //       data.push( { 'file': reader.result, 'filter': '' } );
    //       if(data.length == e.data.length){
    //         resolve( data )
    //       }
    //     };
    //   });
      
    // });
    // teta.then((dados) => {
    //   postMessage(dados);
    // })
    console.log(e.data);
    postMessage(e.data);

  }
);