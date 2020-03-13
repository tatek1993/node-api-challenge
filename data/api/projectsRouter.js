const express = require('express');
const Projects = require('../helpers/projectModel');
const router = express.Router();

module.exports = router;

router.use(express.json());

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was a problem grabbing the projects"
            });
        });
});
router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was a problem grabbing the projects"
            });
        });
});
router.post('/', (req, res) => {
    const body = req.body;
    Projects.insert(body)
        .then(() => {
            res.status(201).json({
                message: "The project was created!", 
                show: body
            })
        })
        .catch((err) => {
            res.status(500).json({
                errorMessage: "There was an error while saving the show to the database"
            });
        });
});
router.put('/:id', validateProjectId, (req, res) => {
    console.log(req.body);
    const {id} = req.params;
    const body = req.body;

    Projects.update(id, body)
        .then(project => {
            res.status(200).json({
                message: "The project was successfully updated!🎉"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errorMessage: "There was a problem updating the project"
            });
        });
});
router.delete('/:id', validateProjectId, async (req, res) => {
    const { id } = req.params;
    const projectId = await Projects.get(id);

    if (projectId.length === 0) {
        res.status(404).json({
            message: "Please include an id!"
        })
    } else {
        Projects.remove(id)
            .then(() => {
                res.status(200).json({
                    message: "The project was successfully deleted 🗑"
                });
            })
            .catch(() => {
                res.status(500).json({
                    errorMessage: "The project could not be removed."
                });
            });
    }
});
router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(act => {
            res.status(200).json(act)
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The action information could not be retrieved."
            });
        });
});

function validateProjectId(req, res, next) {
    // do your magic!
    Projects.get(req.params.id)
    .then(project => {
      if (project == null) {
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
