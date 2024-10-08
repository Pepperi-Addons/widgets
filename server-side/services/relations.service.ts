import { PapiClient, Relation } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';

export class RelationsService {

    papiClient: PapiClient
    bundleFileName = '';

    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client.ActionUUID
        });

        this.bundleFileName = `file_${this.client.AddonUUID}`;
    }


    async upsertRelations(){
        await this.upsertBlockRelation();
    }

      private async upsertBlockRelation(): Promise<any> {
            const blockRelationName = 'widgets';
            const blockName = 'Block';
            const blockRelation: Relation = {
                RelationName: 'PageBlock',
                Name: blockRelationName,
                Description: `Widgets block`,
                Type: "NgComponent",
                SubType: "NG14",
                AddonUUID: this.client.AddonUUID,
                AddonRelativeURL: this.bundleFileName,
                ComponentName: `${blockName}Component`, // This is should be the block component name (from the client-side)
                ModuleName: `${blockName}Module`, // This is should be the block module name (from the client-side)
                ElementsModule: 'WebComponents',
                ElementName: `${blockName.toLocaleLowerCase()}-element-${this.client.AddonUUID}`,
                EditorComponentName: `${blockName}EditorComponent`, // This is should be the block editor component name (from the client-side)
                EditorModuleName: `${blockName}EditorModule`, // This is should be the block editor module name (from the client-side)}
                EditorElementName: `${blockName.toLocaleLowerCase()}-editor-element-${this.client.AddonUUID}`,
                BlockLoadEndpoint: "/addon-cpi/run_on_load_event",
                BlockButtonClickEndpoint: "/addon-cpi/run_button_click_event",
                BlockStateChangeEndpoint: '/addon-cpi/on_block_state_change'
        }
        return await this.upsertRelation(blockRelation);
    }

    // For page block template
    private async upsertRelation(relation): Promise<Relation> {
        return await this.papiClient.addons.data.relations.upsert(relation);
    }

    // private getCommonRelationProperties(
    //     relationName: 'SettingsBlock' | 'PageBlock' | 'AddonBlock',
    //     blockRelationName: string,
    //     blockRelationDescription: string,
    //     blockName: string
    // ): Relation {
    //     return {
    //         RelationName: relationName,
    //         Name: blockRelationName,
    //         Description: blockRelationDescription,
    //         Type: "NgComponent",
    //         SubType: "NG14",
    //         AddonUUID: this.client.AddonUUID,
    //         AddonRelativeURL: this.bundleFileName,
    //         ComponentName: `${blockName}Component`, // This is should be the block component name (from the client-side)
    //         ModuleName: `${blockName}Module`, // This is should be the block module name (from the client-side)
    //         ElementsModule: 'WebComponents',
    //         ElementName: `${blockName.toLocaleLowerCase()}-element-${this.client.AddonUUID}`,
    //     };
    // }

    // private async upsertSettingsRelation(blockRelationSlugName: string, blockRelationGroupName: string, blockRelationName: string, blockRelationDescription: string) {
    //     const blockName = 'Settings';

    //     const blockRelation: Relation = this.getCommonRelationProperties(
    //         'SettingsBlock',
    //         blockRelationName,
    //         blockRelationDescription,
    //         blockName);

    //     blockRelation['SlugName'] = blockRelationSlugName;
    //     blockRelation['GroupName'] = blockRelationGroupName;

    //     return await this.upsertRelation(blockRelation);
    // }

    // private async upsertBlockRelation(blockRelationName: string, isPageBlock: boolean): Promise<Relation> {
    //     const blockName = 'Block';

    //     const blockRelation: Relation = this.getCommonRelationProperties(
    //         isPageBlock ? 'PageBlock' : 'AddonBlock',
    //         blockRelationName,
    //         `${blockRelationName} block`,
    //         blockName);

    //     // For Page block we need to declare the editor data.
    //     if (isPageBlock) {
    //         blockRelation['EditorComponentName'] = `${blockName}EditorComponent`; // This is should be the block editor component name (from the client-side)
    //         blockRelation['EditorModuleName'] = `${blockName}EditorModule`; // This is should be the block editor module name (from the client-side)}
    //         blockRelation['EditorElementName'] = `${blockName.toLocaleLowerCase()}-editor-element-${this.client.AddonUUID}`;
    //     }

    //     return await this.upsertRelation(blockRelation);
    // }

    //async upsertRelations(): Promise<Relation> {
        // For settings block use this.
        // const blockRelationSlugName = 'CHANGE_TO_SETTINGS_SLUG_NAME';
        // const blockRelationGroupName = 'CHANGE_TO_SETTINGS_GROUP_NAME';
        // const blockRelationName = 'CHANGE_TO_SETTINGS_RELATION_NAME';
        // const blockRelationDescription = 'CHANGE_TO_SETTINGS_DESCRIPTION';
        // await this.upsertSettingsRelation(blockRelationSlugName, blockRelationGroupName, blockRelationName, blockRelationDescription);

        // For page block use this.
        // // TODO: change to block name (this is the unique relation name and the description that will be on the block).
        // const blockRelationName = 'CHANGE_TO_BLOCK_RELATION_NAME';
        // await this.upsertBlockRelation(blockRelationName, true);

        // For addon block use this.
        // // TODO: change to block name (this is the unique relation name and the description that will be on the block).
        // const blockRelationName = 'CHANGE_TO_BLOCK_RELATION_NAME';
        // await this.upsertBlockRelation(blockRelationName, false);
  //
}
