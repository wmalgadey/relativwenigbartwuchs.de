```js
this.dataSource = new DataSource({
            store: new ODataStore({
                fieldTypes: {
                    "Product_Cost": "Decimal",
                    "Product_Sale_Price": "Decimal",
                    "Product_Retail_Price": "Decimal"
                },
                url: "https://js.devexpress.com/Demos/DevAV/odata/Products",
            }),              
            select: [
                'Product_ID',
                'Product_Name',
                'Product_Cost',
                'Product_Sale_Price',
                'Product_Retail_Price',
                'Product_Current_Inventory'
            ]
        });
```

  

[https://js.devexpress.com/Demos/WidgetsGallery/Demo/FilterBuilder/WithDataGrid/Angular/Light/](https://js.devexpress.com/Demos/WidgetsGallery/Demo/FilterBuilder/WithDataGrid/Angular/Light/)

  

This demo shows how to use a standalone FilterBuilder to filter data in the DataGrid component. The DataGrid also has an integrated filter builder that can be invoked using the filter panel (see the [Filter Panel](https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/FilterPanel/jQuery/Light/) demo).

Apply Filter

|4|SuperLED 50|$775|$1,100|$1,600|77|
|---|---|---|---|---|---|
|5|[[SuperLED 42]]|$675|$1,050|$1,450|445|
|6|[[SuperLCD 55]]|$745|$1,045|$1,350|345|
|9|[[SuperLCD 70]]|$2,125|$3,200|$4,000|95|
|18|[[ExcelRemote Bluetooth]]|$85|$135|$180|310|

  
  

```
        [fields]="fields"
```

```
        [(value)]="filter">
```

```
    </dx-filter-builder>
```

```
        (onClick)="buttonClick()">
```

```
    </dx-button>
```

```
    <div class="dx-clearfix"></div>
```

```
    [height]="300">
```