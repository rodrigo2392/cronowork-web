import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Card,
  CardContent,
  Alert,
  FormLabel,
  TextField,
  CardActions,
  Button,
  Autocomplete,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateProject,
  useGetProjectById,
  useUpdateProject,
} from "../../../../services/projects.service";
import { useGetClients } from "../../../../services/clients.service";
import { createProjectSchema } from "../../../../validation/projects.validation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1200,
  p: 4,
};
interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetch: () => void;
  id?: string | undefined;
  edit: boolean;
}

interface Client {
  _id: string;
  name: string;
  email: string;
}

export default function CreateModal({
  visible,
  setVisible,
  refetch,
  edit = false,
  id,
}: Props) {
  const queryClient = useQueryClient();
  const { data: clientsData } = useGetClients();
  const { mutate: createClient, error } = useCreateProject();
  const { mutate: updateClient, error: updateError } = useUpdateProject();

  const { data: projectData } = useGetProjectById(id);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createProjectSchema),
  });

  const handleCreate = (data: { name: string; client: string }) => {
    if (edit) {
      return updateClient(
        { ...data, _id: id },
        {
          onSuccess: () => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ["getClientbyId", id] });
            setVisible(false);
          },
        },
      );
    }
    return createClient(data, {
      onSuccess: () => {
        refetch();
        setVisible(false);
      },
    });
  };

  useEffect(() => {
    if (projectData) {
      reset({
        name: projectData?.data?.project?.name,
        client: projectData?.data?.project?.client._id,
      });
    } else {
      reset({
        name: "",
        client: "",
      });
    }
  }, [projectData, reset]);

  return (
    <div>
      <Modal
        open={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ mt: 4 }}>
            <Box
              autoComplete="off"
              component="form"
              onSubmit={handleSubmit(handleCreate)}
              noValidate
              sx={{ mt: 1, textAlign: "center" }}
            >
              <Card sx={{ paddingX: 2, paddingY: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5">Agregar cliente</Typography>
                  </Box>

                  {(error || updateError) && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Ha ocurrido un error, inténtalo de nuevo más tarde.
                    </Alert>
                  )}

                  <Box sx={{ textAlign: "left", mb: 2 }}>
                    <FormLabel>Nombre</FormLabel>
                    <TextField
                      margin="normal"
                      placeholder="Nombre"
                      required
                      fullWidth
                      {...register("name")}
                      id="name"
                      autoFocus
                    />

                    {errors.name && (
                      <Typography color="error">
                        {errors.name?.message?.toString()}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    {!edit && (
                      <Autocomplete
                        autoHighlight
                        options={
                          clientsData?.data?.docs.map((el: Client) => {
                            return {
                              label: el.name,
                              _id: el._id,
                            };
                          }) || []
                        }
                        disabled={!!id}
                        sx={{ width: "100%" }}
                        onChange={(_, value) =>
                          setValue("client", (value as Client)._id)
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Cliente" />
                        )}
                      />
                    )}
                    {edit && projectData && (
                      <TextField
                        margin="normal"
                        placeholder="Nombre"
                        value={projectData?.data?.project?.client?.name}
                        disabled
                        required
                        fullWidth
                        id="name"
                        autoFocus
                      />
                    )}

                    {errors.client && (
                      <Typography color="error">
                        {errors.client?.message?.toString()}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions
                  sx={{ flex: 1, justifyContent: "space-between", mt: 4 }}
                >
                  <Button onClick={() => setVisible(false)} variant="text">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    {edit ? "Guardar" : "Agregar"}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
