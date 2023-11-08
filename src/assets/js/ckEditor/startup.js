//CK 4
//CKEDITOR.replace( 'editor' );

// petica je dole
ClassicEditor
.create( document.querySelector( '#editor' ) )
.then( editor => {
        console.log( editor );
} )
.catch( error => {
        console.error( error );
} );