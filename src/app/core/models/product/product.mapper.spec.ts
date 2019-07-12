import { TestBed, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { anything, spy, verify } from 'ts-mockito';

import { configurationReducer } from 'ish-core/store/configuration/configuration.reducer';
import { Attribute } from '../attribute/attribute.model';
import { ImageMapper } from '../image/image.mapper';
import { Link } from '../link/link.model';

import { VariationProductMaster } from './product-variation-master.model';
import { ProductData, ProductDataStub } from './product.interface';
import { ProductMapper } from './product.mapper';
import { Product, ProductHelper } from './product.model';

describe('Product Mapper', () => {
  let productMapper: ProductMapper;
  let imageMapper: ImageMapper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          { configuration: configurationReducer },
          {
            initialState: {
              configuration: { baseURL: 'http://www.example.org' },
            },
          }
        ),
      ],
    });
    productMapper = TestBed.get(ProductMapper);
    imageMapper = spy(TestBed.get(ImageMapper));
  }));

  describe('fromData', () => {
    it(`should return Product when getting a ProductData`, () => {
      const product: Product = productMapper.fromData({ sku: '1' } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('Product');
      verify(imageMapper.fromImages(anything())).once();
    });

    it(`should return VariationProduct when getting a ProductData with mastered = true`, () => {
      const product: Product = productMapper.fromData({
        sku: '1',
        mastered: true,
        productMasterSKU: '2',
      } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('VariationProduct');
      expect(ProductHelper.isMasterProduct(product)).toBeFalsy();
      verify(imageMapper.fromImages(anything())).once();
    });

    it(`should return VariationProductMaster when getting a ProductData with productMaster = true`, () => {
      const product: Product = productMapper.fromData({ sku: '1', productMaster: true } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('VariationProductMaster');
      expect(ProductHelper.isMasterProduct(product)).toBeTruthy();
    });

    it(`should return VariationProductMaster with variationAttributes when getting a ProductData with productMaster = true`, () => {
      const product: Product = productMapper.fromData({
        sku: '1',
        productMaster: true,
        variationAttributeValues: [],
      } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('VariationProductMaster');
      expect(ProductHelper.isMasterProduct(product)).toBeTruthy();
      expect((product as VariationProductMaster).variationAttributeValues).toBeEmpty();
    });

    it(`should return Product with variationAttributes when getting a ProductData with productMaster = false`, () => {
      const product: Product = productMapper.fromData({
        sku: '1',
        productMaster: false,
        variableVariationAttributes: [],
      } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('Product');
      expect(ProductHelper.isMasterProduct(product)).toBeFalsy();
      expect((product as VariationProductMaster).variationAttributeValues).toBeFalsy();
    });

    it('should return ProductBundle when getting a ProductData with productBundle = true', () => {
      const product: Product = productMapper.fromData({
        sku: '1',
        productBundle: true,
      } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('Bundle');
      expect(ProductHelper.isProductBundle(product)).toBeTrue();
    });

    it('should return ProductBundle when getting a ProductData with producttype contains "BUNDLE"', () => {
      const product: Product = productMapper.fromData({
        sku: '1',
        productTypes: ['BUNDLE'],
      } as ProductData);
      expect(product).toBeTruthy();
      expect(product.type).toEqual('Bundle');
      expect(ProductHelper.isProductBundle(product)).toBeTrue();
    });
  });

  describe('fromStubData', () => {
    it('should throw an error when stub data has no sku attribute', () => {
      expect(() => productMapper.fromStubData({} as ProductDataStub)).toThrowErrorMatchingInlineSnapshot(
        `"cannot construct product stub without SKU"`
      );
    });

    it('should construct a stub when supplied with an API response', () => {
      const stub = productMapper.fromStubData({
        attributes: [{ name: 'sku', value: 'productSKU', type: 'String' }],
        title: 'productName',
        description: 'productDescription',
      });
      expect(stub).toBeTruthy();
      expect(stub.name).toEqual('productName');
      expect(stub.shortDescription).toEqual('productDescription');
      expect(stub.sku).toEqual('productSKU');
      verify(imageMapper.fromImages(anything())).once();
    });

    it('should construct a stub when supplied with a complex API response', () => {
      const stub = productMapper.fromStubData({
        attributes: [
          { name: 'sku', value: '7912057' },
          { name: 'image', value: '/assets/product_img/a.jpg' },
          {
            name: 'listPrice',
            value: { currency: 'USD', type: 'Money', value: 132.24 },
          },
          {
            name: 'salePrice',
            value: { currency: 'USD', type: 'Money', value: 132.24 },
          },
          { name: 'availability', value: true },
          { name: 'manufacturer', value: 'Kodak' },
          { name: 'minOrderQuantity', value: { value: 5 } },
          { name: 'inStock', value: false },
        ] as Attribute[],
        description: 'EasyShare M552, 14MP, 6.858 cm (2.7 ") LCD, 4x, 28mm, HD 720p, Black',
        title: 'Kodak M series EasyShare M552',
      });

      expect(stub).toMatchSnapshot();
    });
  });

  describe('fromProductBundleData', () => {
    it('should map bundle stubs to sku and quantity', () => {
      expect(
        productMapper.fromProductBundleData([
          {
            attributes: [{ name: 'quantity', value: { value: 1 } }],
            uri: 'inSPIRED-inTRONICS-Site/-/products/201807191',
          },
          {
            attributes: [{ name: 'quantity', value: { value: 2 } }],
            uri: 'inSPIRED-inTRONICS-Site/-/products/201807192',
          },
          {
            attributes: [{ name: 'quantity', value: { value: 1 } }],
            uri: 'inSPIRED-inTRONICS-Site/-/products/201807193',
          },
        ] as Link[])
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "quantity": 1,
            "sku": "201807191",
          },
          Object {
            "quantity": 2,
            "sku": "201807192",
          },
          Object {
            "quantity": 1,
            "sku": "201807193",
          },
        ]
      `);
    });
  });
});
