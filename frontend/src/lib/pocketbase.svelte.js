import PocketBase from 'pocketbase';

//export const pb = new PocketBase('http://YOUR-SERVER-IP-OR-URL'); // remote
export const pb = new PocketBase('http://127.0.0.1:8090'); // local

export const currentUser = $state({ user: pb.authStore.model, canCreate: false });

pb.authStore.onChange((auth) =>
{
    console.log('authStore changed', auth);
    currentUser.user = pb.authStore.model;
    currentUser.canCreate = currentUser.user != null;
    currentUser.canEdit = currentUser.user != null;
    currentUser.canViewBorrowers = currentUser.user != null;
});

