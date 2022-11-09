import { expect } from 'chai';
import * as sinon from 'sinon';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/carModel';
import CarsService from '../../../services/carServices';
import * as carMock from '../../../../__tests__/utils/CarsMock';

const carMockWithId = { _id:'umidextremamentebom1308', ...carMock.validCar };
const carUpdateMockWithId = { _id:'umidextremamentebom1308', ...carMock.updatedCar };

describe('Cars Service', () => {

  const carModel = new CarsModel();
  const carsServices = new CarsService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa método create do service', () => {
    it('Cria com sucesso', async () => {
      const result = await carsServices.create(carMock.validCar);
      expect(result).to.be.deep.equal(carMockWithId);
    });
  });

  describe('testa método read', () => {
    it('Pega todos os carros com sucesso', async () => {
      const result = await carsServices.read();
      expect(result).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('testa o metodo readOne', () => {
    it('Em caso de sucesso', async () => {
      const result = await carsServices.readOne('umidextremamentebom1308');
      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Em caso de fracasso', async () => {
      let error;
      try {
        await carsServices.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('testa o método update', () => {
    it('quando atualiza com sucesso', async () => {
      sinon.stub(carModel, 'update').resolves(carUpdateMockWithId);

      const result = await carsServices.update('umidextremamentebom1308', carMock.updatedCar);
      expect(result).to.be.deep.equal(carUpdateMockWithId);

      sinon.restore();
    });

    it('em caso de fracasso por não encontrar o id', async () => {
      sinon.stub(carModel, 'update').resolves(null);

      let error;

      try {
        await carsServices.update('invalid', carMock.updatedCar)
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      sinon.restore();
    });
  });
});