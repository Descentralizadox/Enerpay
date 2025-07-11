import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type CreateClabeResponse201 = FromSchema<typeof schemas.CreateClabe.response['201']>;
export type CreateClabeResponse401 = FromSchema<typeof schemas.CreateClabe.response['401']>;
export type CreateClabeResponse403 = FromSchema<typeof schemas.CreateClabe.response['403']>;
export type CreateClabeResponse500 = FromSchema<typeof schemas.CreateClabe.response['500']>;
export type GetClabeDetailsMetadataParam = FromSchema<typeof schemas.GetClabeDetails.metadata>;
export type GetClabeDetailsResponse200 = FromSchema<typeof schemas.GetClabeDetails.response['200']>;
export type GetClabeDetailsResponse401 = FromSchema<typeof schemas.GetClabeDetails.response['401']>;
export type GetClabeDetailsResponse404 = FromSchema<typeof schemas.GetClabeDetails.response['404']>;
export type GetClabeDetailsResponse500 = FromSchema<typeof schemas.GetClabeDetails.response['500']>;
export type UpdateClabeStatusBodyParam = FromSchema<typeof schemas.UpdateClabeStatus.body>;
export type UpdateClabeStatusMetadataParam = FromSchema<typeof schemas.UpdateClabeStatus.metadata>;
export type UpdateClabeStatusResponse200 = FromSchema<typeof schemas.UpdateClabeStatus.response['200']>;
export type UpdateClabeStatusResponse400 = FromSchema<typeof schemas.UpdateClabeStatus.response['400']>;
export type UpdateClabeStatusResponse401 = FromSchema<typeof schemas.UpdateClabeStatus.response['401']>;
export type UpdateClabeStatusResponse403 = FromSchema<typeof schemas.UpdateClabeStatus.response['403']>;
export type UpdateClabeStatusResponse500 = FromSchema<typeof schemas.UpdateClabeStatus.response['500']>;
export type UserClabeDepositMetadataParam = FromSchema<typeof schemas.UserClabeDeposit.metadata>;
export type UserClabeDepositResponse200 = FromSchema<typeof schemas.UserClabeDeposit.response['200']>;
export type UserClabeDepositResponse400 = FromSchema<typeof schemas.UserClabeDeposit.response['400']>;
export type UserClabeDepositResponse401 = FromSchema<typeof schemas.UserClabeDeposit.response['401']>;
export type UserClabeDepositResponse500 = FromSchema<typeof schemas.UserClabeDeposit.response['500']>;
export type UserClabesMetadataParam = FromSchema<typeof schemas.UserClabes.metadata>;
export type UserClabesResponse200 = FromSchema<typeof schemas.UserClabes.response['200']>;
export type UserClabesResponse400 = FromSchema<typeof schemas.UserClabes.response['400']>;
export type UserClabesResponse401 = FromSchema<typeof schemas.UserClabes.response['401']>;
export type UserClabesResponse404 = FromSchema<typeof schemas.UserClabes.response['404']>;
export type UserClabesResponse500 = FromSchema<typeof schemas.UserClabes.response['500']>;
