import '@pepperi-addons/cpi-node'

export async function load(configuration: any): Promise<void>{
    return Promise.resolve();
}

export const router = Router()
router.post('/state_change', async (req, res) => {
    const state = req.body.State || {};
    const changes = req.body.Changes || {};

    const mergeState = {...state, ...changes};
    res.json({
        State: mergeState,
        Configuration: changes,
    });
});

router.post('/click_event', async (req, res) => {
    const state = req.body.State || {};
    const changes = req.body.Changes || {};

    const mergeState = {...state, ...changes};
    res.json({
        State: mergeState,
        Configuration: changes,
    });
});

router.post('/on_load', async (req, res) => {
    const state = req.body.State || {};
    const changes = req.body.Changes || {};

    const mergeState = {...state, ...changes};
    res.json({
        State: mergeState,
        Configuration: changes,
    });
});
