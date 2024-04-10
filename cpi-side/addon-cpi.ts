import "@pepperi-addons/cpi-node";
import WidgetsCPIService from "./widgets-cpi.service";

export async function load(configuration: any): Promise<void> {
  return Promise.resolve();
}

export const router = Router();
router.post("/state_change", async (req, res) => {
  const state = req.body.State || {};
  const changes = req.body.Changes || {};

  const mergeState = { ...state, ...changes };
  res.json({
    State: mergeState,
    Configuration: changes,
  });
});

router.post("/click_event", async (req, res) => {
  const state = req.body.State || {};
  const changes = req.body.Changes || {};

  const mergeState = { ...state, ...changes };
  res.json({
    State: mergeState,
    Configuration: changes,
  });
});

router.post("/on_load", async (req, res) => {
  const configuration = req?.body?.Configuration;
  let configurationRes = configuration;
  const state = req?.body?.State || {};
  // check if flow configured to on load --> run flow (instaed of onload event)
  if (configuration?.WidgetConfig?.OnLoadFlow) {
    try {
      const cpiService = new WidgetsCPIService();
      //CALL TO FLOWS AND SET CONFIGURATION
      const result: any = await cpiService.getOptionsFromFlow(
        configuration?.WidgetConfig?.OnLoadFlow || [],
        state,
        req.context,
        configuration
      );
      configurationRes = result?.configuration || configuration;
    } catch (err) {
      configurationRes = configuration;
    }
  }
  res.json({
    State: state,
    Configuration: configurationRes,
  });
});
