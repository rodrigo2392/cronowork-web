import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AppLayout from "../../../layouts/app.layout";
import columnDefinition from "./column-definition";
import GenericTable from "../../../components/Table";
import {
  useGetProjects,
  useDeleteProject,
} from "../../../services/projects.service";
import CreateModal from "./forms/create";
import { UnknownAction } from "@reduxjs/toolkit";
import paginationResult from "../../../types/table.types";
import PlusIcon from "@mui/icons-material/Add";

export default function Projects() {
  const [editId, setEditId] = useState<string | undefined>();
  const [showCreateModal, setCreateModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { data, isLoading, isRefetching, error, refetch } = useGetProjects();
  const { mutate: removeClient } = useDeleteProject();
  const [openDelete, setOpenDelete] = useState(false);

  const labels = {
    deleteTitle: "¿Seguro que deseas eliminar este proyecto?",
    deleteDescription:
      "El proyecto será eliminado permanentemente del sistema y no podrá ser recuperado.",
    deleteSuccess: "Elemento eliminado correctamente.",
  };

  const deleteFunction = (id: string) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const editFunction = (id: string) => {
    setEditId(id);
    setCreateModal(true);
  };

  const columns = columnDefinition({ deleteFunction, editFunction });
  return (
    <AppLayout>
      <Box sx={{ mb: 4, ml: 2 }}>
        <CreateModal
          id={editId}
          edit={!!editId}
          refetch={refetch}
          visible={showCreateModal}
          setVisible={setCreateModal}
        />
        <Typography variant="h4">Proyectos</Typography>
        <Box sx={{ mt: 4 }}>
          <Box>
            <Box
              sx={{ display: "flex", gap: 2, marginTop: 2, marginBottom: 2 }}
            >
              <Button
                onClick={() => {
                  setCreateModal(true);
                  setEditId(undefined);
                }}
                size="small"
                variant="contained"
                startIcon={<PlusIcon />}
              >
                Agregar
              </Button>
            </Box>
          </Box>
          <GenericTable
            data={data as paginationResult}
            isLoading={isLoading}
            error={error}
            labels={labels}
            columns={columns as []}
            changeRowPerPage={() =>
              console.log("change") as unknown as UnknownAction
            }
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            refetch={refetch}
            isRefetching={isRefetching}
            deleteFunction={removeClient}
            deleteId={deleteId}
          />
        </Box>
      </Box>
    </AppLayout>
  );
}
