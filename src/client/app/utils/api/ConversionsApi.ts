//connecting the front end and back end
import ApiBackend from './ApiBackend';
import {Conversion} from '../../types/items'

export default class ConversionsApi {

	private readonly backend: ApiBackend;

	constructor(backend: ApiBackend) {
		this.backend = backend;
	}
    public async getAll(): Promise<Conversion []> {
		return await this.backend.doGetRequest<Conversion[]>('/');
	};
	public async getSource(sourceId: string, destinationId: string): Promise<Conversion> {
		return await this.backend.doGetRequest<Conversion>("/:sourceId&:destinationId",{sourceId, destinationId} );
	};
	public async deleteUser(sourceId: string, destinationId: string):Promise<Conversion>
	{
		return await this.backend.doPostRequest<Conversion>('/delete', {sourceId, destinationId})
	};
	public async editUser(sourceId:string, destinationId: string, bidirectional:boolean, slope:number, intercept:number,note:string):Promise<Conversion>
	{
		return await this.backend.doPostRequest<Conversion>('/edit',{sourceId,destinationId,bidirectional,slope,intercept,note})
	}
	public async createUser(sourceId:string, destinationId: string, bidirectional:boolean, slope:number, intercept:number,note:string):Promise<Conversion>
	{
		return await this.backend.doPostRequest<Conversion>('/create', {sourceId,destinationId,bidirectional,slope,intercept,note})
	}

}