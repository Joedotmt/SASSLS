import PocketBase from 'pocketbase';

//export const pb = new PocketBase('http://YOUR-SERVER-IP-OR-URL'); // remote
export const pb = new PocketBase('http://127.0.0.1:8090'); // local
//export const pb = new PocketBase('http://library.pockethost.io'); // demo


export const currentUser = $state({ user: pb.authStore.record, canCreate: false });

pb.authStore.onChange((auth) =>
{
    console.log('authStore changed');
    currentUser.user = pb.authStore.record;
    currentUser.canCreate = currentUser.user != null;
    currentUser.canEdit = currentUser.user != null;
    currentUser.canViewBorrowers = currentUser.user != null;
});

