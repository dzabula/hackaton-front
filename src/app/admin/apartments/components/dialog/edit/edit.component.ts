import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { CitiesService } from 'src/app/shared/services/cities/cities.service';
import { ICategory } from 'src/app/shared/interface/i-category';
import { ICity } from 'src/app/shared/interface/i-city';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { IImage } from 'src/app/shared/interface/i-image';
import { IPrice } from 'src/app/shared/interface/i-price';
import { HttpHeaders } from '@angular/common/http';
import { SpecificationsService } from 'src/app/shared/services/specifications/specifications.service';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { IGetSpecification } from 'src/app/shared/interface/i-get-specification';
import { ISpecificationsToSend } from 'src/app/shared/interface/i-specification-to-send';
import { Router } from '@angular/router';
import { ISpecPrice } from 'src/app/shared/interface/i-spec-price';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IRooms } from 'src/app/shared/interface/i-rooms';
import { RoomsService } from 'src/app/shared/services/rooms/rooms.service';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})

export class EditComponent implements OnInit {
  editApartmentForm: FormGroup = new FormGroup([]);
  appearance: MatFormFieldAppearance = 'fill';

  specPriceControls: any[] = new Array();
  numSpecPriceControls: number = 0;

  categories: ICategory[];
  cities: ICity[]; 
  currentApartment: IApartment;
  specifications$: IGetSpecification[];
  rooms: IRooms[];


  selectedCityId: number;
  defaultSelectedCaityId: number;
  
  selectedCategoryId: number;
  defaultSelectedCategoryId: number;

  defaultSelectedRommId: number;
  selectedRoomid: number;

  convertedImages: string[] = [];
  convertedThumbImage: string;

  editableImages: IImage[];
  // CKEditor
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private formBuilder: FormBuilder,
    private apartmentService: ApartmentsService,
    private categoryService: CategoryService,
    private cityService: CitiesService,
    private snackBar: MatSnackBar,
    private specificationService: SpecificationsService,
    private router: Router,
    private roomService: RoomsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      dialogRef.updateSize('95%');
    } else {
      dialogRef.updateSize('80%');
    }
  }

  ngOnInit(): void {
    this.currentApartment = this.data.currentApartment;
    this.categories = this.data.categories;
    this.createForm();
    this.initializeForm()

  }


  createForm(): void {
    this.editApartmentForm = this.formBuilder.group({
      title: [this.currentApartment.title, Validators.required],
      description: [this.currentApartment.description, Validators.required],
      pricePerNight: [this.currentApartment.price.pricePerNight, [Validators.required,Validators.min(1)]],
      priceOnHoliday: [this.currentApartment.price.priceOnHoliday,[Validators.required,Validators.min(1)]],
      priceOnNewYear: [this.currentApartment.price.priceOnNewYear,[Validators.required,Validators.min(1)]],
      category: ['', Validators.required],
      city: ['', Validators.required],
      googleMap: [this.currentApartment.googleMap],
      image: [''],
      images: [[]],
      priority:[this.currentApartment.priority,[Validators.required,Validators.min(1)]],
      surface:[this.currentApartment.surface,[Validators.required,Validators.min(1)]],
      rooms:['',Validators.required]
    });
  }

  initializeForm(){
    this.selectedRoomid = this.currentApartment.room.id;
    this.fetchCities();
    this.fetchRooms();
    this.getAditionalInfo(this.currentApartment.id);

    this.selectedCategoryId = this.currentApartment.category.id;
    this.selectedCityId = this.currentApartment.city.id;

  }

  getAditionalInfo(id: number):void{
    this.apartmentService.getOne(id).subscribe({
      next:response =>{
          
          this.currentApartment.apartmentSpecifications = response.apartmentSpecifications;
          this.editableImages = response.images.map((image) => {
            return { id: image.id, path: image.path , isChecked: true };
          });
          this.loadSpecPriceControls(response.specPrices);
          this.fetchSpecifications();
      },
      error: xhr =>{
        this.snackBar.open("Doslo je do greske prilikom ucitavanja apartmana. Pokusajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  loadSpecPriceControls(arr: ISpecPrice[]){
    arr.forEach(x=>{
      x.id = Math.random() * 10000;
      x.formatedDate = new Date(x.date);
    })
    this.specPriceControls = arr;
  }

  fetchSpecifications(){
    this.specificationService.get().subscribe({
      next: response =>{
      this.specifications$ = response;
      this.addControls(response);
     
      },
      error: xhr=>{
        this.snackBar.open("Doslo je do greske prilikom ucitavanja specifikacija. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        console.log(xhr);
      }
    })
  }

  fetchCategories(): void {
    this.categoryService.get().subscribe({
      next: resposne =>{
        this.categories = resposne;
      },
      error: xhr =>{
       const snack  = this.snackBar.open("Doslo je do greske prilikom ucitavanja kategorija. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  fetchCities(): void {
    this.cityService.get().subscribe({
      next: resposne =>{
        this.cities = resposne;
        
      },
      error: xhr =>{
       const snack  = this.snackBar.open("Doslo je do greske prilikom ucitavanja gradova. Pokusajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  fetchRooms(): void{
    this.roomService.get().subscribe({
      next: response =>{
        this.rooms = response
      },
      error: xhr=>{
        this.snackBar.open("Došlo je do greške prilikom učitavanja apartmana. Pokušajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  handleThumbImageInput(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      let base64String = event.target.result;
      base64String = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      this.convertedThumbImage = base64String;
    };

    reader.onerror = (error) => {
      console.error('Greška prilikom konverzije slike:', error);
    };

    reader.readAsDataURL(file);
    }
  }

  handleImagesInput(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = (event: any) => {
          let base64String = event.target.result;
          base64String = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
          this.convertedImages.push(base64String);
        };
  
        reader.onerror = (error) => {
          console.error('Greška prilikom konverzije slike:', error);
        };
  
        reader.readAsDataURL(file);
      }
    }
  }

  addControls(spsecifications:any[]){
    spsecifications.forEach(spec => {

      let currentSpec = this.currentApartment.apartmentSpecifications.filter(x=>x.specificationId == spec.id);
      let currentValue = ""
      if(currentSpec.length > 0) currentValue = currentSpec[0].value;
      this.editApartmentForm.addControl(spec.name, this.formBuilder.control(currentValue,Validators.required));
    });

  }

  addSpecPriceControls() {
    this.specPriceControls.push({
      date:new Date(),
      price :0,
      id: Math.random() * 10000
    })

    this.numSpecPriceControls = this.numSpecPriceControls + 1;
  }

  removeFromSpecPrice(index:number){
    console.log(index);
    var x = this.specPriceControls.filter(y=>y.id != index);    
    this.specPriceControls = x; 
    this.numSpecPriceControls--;
  }

  onSubmit(): void {


    if (this.editApartmentForm.invalid) {
      return;
    }

    var specificationToSend: ISpecificationsToSend[] = [];
    const formValue = this.editApartmentForm.value;
    
    this.specifications$.forEach(x=>{ // popunjavanje objekta koji treba da se posalje na server za update specifikacija
      var obj: ISpecificationsToSend;
      obj = {
        specificationId : x.id,
        apartmentId: this.currentApartment.id,
        value : formValue[x.name] 
      }
      specificationToSend.push(obj);
    })

    var body = this.editApartmentForm.value; // kopiramo sve podatke iz forme u boy pa cemo u daljem kod formatirati body u isptavnom formatui za API

    body.id = this.currentApartment.id;

    if(this.convertedThumbImage){
      body.file = this.convertedThumbImage; // ukoliko je kor. otpremio sliku zapisujemo njen base64 u body
      body.fileId = 0;
    }
    else body.fileId = this.currentApartment.file.id;  // ukoliko je korisnik sacuvao staru sliku upisujemo id te slike

    var newPrice: IPrice = {
      priceOnHoliday :body.priceOnHoliday,
      pricePerNight : body.pricePerNight,
      priceOnNewYear: body.priceOnNewYear
    }

    body.price = newPrice; // postavljanje objekta cene u ispravnom formatu (price {pricePerNight:0,priceOnHoliday:0,pricePerNightWeekend:0})


    var priceSpec: ISpecPrice[] = [];

    this.specPriceControls.forEach(e=>{
      var obj = {
        price:0,
        date:""
      };
      var price = document.getElementById("price"+e.id);
      var price2 = (price as HTMLInputElement);
      if(price2){
        obj.price = parseFloat(price2.value);
      }
      var date = document.getElementById("date"+e.id);
      var date2 = (date as HTMLInputElement);
      if(date2){
        obj.date = this.formatDate(date2.value);
      }
      //console.log(obj);
      priceSpec.push({price: obj.price, date: obj.date});
      
    })
    body.specPrices = priceSpec;


    if(this.convertedImages) body.images = this.convertedImages; // ukoliko je korisnik uploadovao slike one se ubacuju u body
    
    var checkedImages = this.editableImages.filter(x=>x.isChecked == true); // Uzimanje starih slika koje je korisnik oznacio da zeli da ostanu

    body.imagesIds = checkedImages.map((image) => {
      return image.id; // mapiraju se id-evi slika koje je korisnik oznacio da treba da ostanu sacuvane (da se ne brisu) 
    });
    
    body.roomId = this.editApartmentForm.value.rooms;

    body.cityId = this.editApartmentForm.value.city; // uzimanje id grada

    body.categoryId = this.editApartmentForm.value.category; // uzimanbje id kategorije

    this.updateApartmentSpecification(specificationToSend);
    this.updateApartment(body);


    
  }

  updateApartment(body: any){
    const token = localStorage.getItem("token");
    this.apartmentService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.apartmentService.patch(body).subscribe({
      next: ()=>{
        this.snackBar.open("Uspesno ste azurirali apartman. Podaci su sacuvani.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        
        this.success();
      },
      error: (xhr) => {
        var text = "Doslo je do greske prilikom azuriranja apartmana. Pokusajte kasnije.";
        if(xhr.status == 422){
          text = xhr.error.errors[0].error;
        }else if( xhr.status == 401){
          this.router.navigate(['/login']);
        }else if(xhr.status == 400){
          text = xhr.error.error;
        }
        this.snackBar.open(text, 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        
      }
    });
  }


  updateApartmentSpecification(specificationToSend:any[]){
    var token = localStorage.getItem("token");
    this.specificationService.headers = new HttpHeaders().set("Authorization","Bearer "+token);
    specificationToSend.forEach(x=>{
      var objToSend: ISpecificationsToSend ={
        specificationId : x.specificationId,
        apartmentId: x.apartmentId,
        value:x.value
      };
      this.specificationService.post(objToSend).subscribe({
        next:repsonse=>{
          
        },
        error :xhr=>{
          this.snackBar.open("Doslo je do greske prilikom azuriranja specifikacija. Pokusajte kasnije.", 'Zatvori', {
            duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
            panelClass: "error-snackbar"
          });
          console.log(xhr);
        }
      });

    })
  }
  success(){
    this.dialogRef.close(this.currentApartment.id); // vracamo Id kako bismo u glavnoji tabeli azurirali samo onaj apartman koji je editovan

  }

  close(){
    this.dialogRef.close("dismiss");

  }
  
  formatDate(inputDate: any):string  {
    const parts = inputDate.split('/');
    const year = parts[2];
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
