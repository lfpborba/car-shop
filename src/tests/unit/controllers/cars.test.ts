import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import CarsController from '../../../controllers/carController';
import CarsService from '../../../services/carServices';
import CarsModel from '../../../models/carModel';
import * as carMock from '../../../../__tests__/utils/CarsMock';

const carMockWithId = { _id:'umidextremamentebom1308', ...carMock.validCar };

describe('Cars controller', () => {
  const carModel = new CarsModel();
  const carServices = new CarsService(carModel);
  const carController = new CarsController(carServices);
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction


  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res)
  });


  afterEach(() => {
    sinon.restore()
  })

  describe(`Testa método create do controller`, () => {
    describe('em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(carServices, 'create').resolves(carMock.validCar);
      });
      afterEach(()=>{
        sinon.restore();
      })

      it(`deve criar um novo carro e retornar um status 201`, async () => {
        req.body = carMock.validCar;
        await carController.create(req, res, next);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;

        expect(statusStub.calledWith(201)).to.be.true;
        expect(jsonStub.calledWith(req.body)).to.be.true;
      });
    });
  });

  describe('testa método read', () => {
    describe('em caso de sucesso', () => {
      beforeEach(() => {
          sinon.stub(carServices, 'read').resolves([carMockWithId]);
        });

      it('should search and return a array of cars' , async () => {
        await carController.read(req, res, next);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith([carMockWithId])).to.be.true;

      });
    })
  });
});