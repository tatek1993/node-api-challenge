const express = require('express');
const Actions = require('../helpers/actionModel');
const Projects = require('../helpers/projectModel');
const router = express.Router();

module.exports = router;

router.use(express.json());

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was a problem grabbing the actions"
            });
        });
});
router.post('/', validateProjectId, (req, res) => {
    const body = req.body;
    console.log('project id', req.body.project_id);
    Actions.insert(body)
        .then(() => {
            res.status(201).json({
                message: "The action was created!",
                show: body
            })
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "There was an error while saving the action to the database"
            });
        });
});
router.put('/:id', (req, res) => {
    console.log(req.body);
    const {id} = req.params;
    const body = req.body;

    Actions.update(id, body)
        .then(action => {
            res.status(200).json({
                message: "The action was successfully updated!🎉"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errorMessage: "There was a problem updating the action"
            });
        });
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const actionId = await Actions.get(id);

    if (actionId.length === 0) {
        res.status(404).json({
            message: "Please include an id!"
        })
    } else {
        Actions.remove(id)
            .then(() => {
                res.status(200).json({
                    message: "The action was successfully deleted 🗑"
                });
            })
            .catch(() => {
                res.status(500).json({
                    errorMessage: "The action could not be removed."
                });
            });
    }
});

function validateProjectId(req, res, next) {
    // do your magic!
    Projects.get(req.body.project_id)
    .then(project => {
      if (project === null) {
          res.status(404).json({message: "The project with the specified ID does not exist."})
      } else {
          next();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ 
          error: "The project information could not be retrieved." 
      });
    });   
    
}